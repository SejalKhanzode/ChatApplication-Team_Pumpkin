const Message = require("../models/MessageModel")
const User = require("../models/UserModel")

exports.getAllUsers = async (req, res) => {
    try {
      const loggedInUserId = req.user.id; 
  
      const users = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
  
      return res.status(200).json({
        success: true,
        users,
      });
    } catch (error) {
      console.error("Error fetching users:", error);
      return res.status(500).json({
        success: false,
        message: "Unable to fetch users",
      });
    }
  };


  exports.getMessages = async (req, res) => {
    try {
      const { id: userToChatId } = req.params;
      const myId = req.user._id;
  
      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.log("Error in getMessages controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
  
  exports.sendMessage = async (req, res) => {
    try {
    //   const { text, image } = req.body;
    const {text} = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;
  
    //   let imageUrl;
    //   if (image) {
    //     // Upload base64 image to cloudinary
    //     const uploadResponse = await cloudinary.uploader.upload(image);
    //     imageUrl = uploadResponse.secure_url;
    //   }
  
      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        // image: imageUrl,
      });
  
      await newMessage.save();
  
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
  
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller: ", error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  };
