import User from "../models/UserModel.js";
import Channel from "../models/ChannelModel.js";
import mongoose from "mongoose";

export const createChannel = async (req, res) => {
  try {
    const { name, members } = req.body;
    const userId = req.userId;

    const admin = await User.findById(userId);

    if (!admin) {
      return res.status(404).send("Admin user not found.");
    }

    const validMembers = await User.find({ _id: { $in: members } });

    if (validMembers.length !== members.length) {
      return res.status(400).send("Some members are not valid users.");
    }

    const newChannel = new Channel({
      name,
      members,
      admin: userId,
    });

    await newChannel.save();
    return res.status(200).json({ channel: newChannel });
  } catch (error) {
    return res.status(520).send("Internal server error!!");
  }
};

export const getUserChannels = async (req, res) => {
  try {
    const userId = await new mongoose.Types.ObjectId(req.userId);
    const channels = await Channel.find({
      $or: [{ admin: userId }, { members: userId }],
    }).sort({ updateAt: -1 });

    return res.status(200).json({ channels: channels });
  } catch (error) {
    return res.status(520).send("Internal server error!!");
  }
};

export const getChannelMessage = async (req, res) => {
  try {
    const { channelId } = req.params;
    const channel = await Channel.findById(channelId).populate({
      path: "messages",
      populate: {
        path: "sender",
        select: "firstName lastName email _id image color",
      },
    });

    if (!channel) {
      return res.status(404).send("Channel not found");
    }

    const messages = channel.messages;

    return res.status(200).json({ messages });
  } catch (error) {
    return res.status(520).send("Internal server error!!");
  }
};
