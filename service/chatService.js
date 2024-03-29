require("dotenv").config();
const axios = require("axios");
const User = require("../models/User");

const ServiceType = require("../models/ServiceType");

const ChatMessages = require("../models/ChatMessages");
const ChatConversations = require("../models/ChatConversations");

const ServicePartner = require("../models/ServicePartner");
const ProductPartner = require("../models/ProductPartner");
const { getUserDetails } = require("./UserService");
const { adminLevels } = require("../helpers/utility");
const Chats = require("../models/Chats");

exports.checkExistingConversation = async (participantsId) => {
  const conversations = await ChatConversations.findAll();
  if (conversations.length > 0) {
    for (let i = 0; i < conversations.length; i++) {
      let array1 = participantsId;
      let array2 = conversations[i].participantsId;
      if (array1.length === array2.length) {
        const isEqual = (a, b) =>
          JSON.stringify(a.sort()) === JSON.stringify(b.sort());
          if (isEqual(array1, array2) == true) {
            console.log("convo exists")
            return conversations[i].id
          }else{
            console.log('doesnt exist')
          }



        //  console.log("ggg");
        //  console.log(i);

        // for (let c = 0; c < array1.length; c++) {
        //   if (array2.includes(array1[c])) {
        //     console.log("convo exist")
        //     return conversations[i].id;
        //   }
        // }
      }
      console.log("convo doesnt exist")
      
    }
  }
      console.log("convo doesnt exist");

  return false;
};

exports.checkMessageType = async (participantsId) => {
  for (let i = 0; i < participantsId.length; i++) {
    const userDetails = await getUserDetails({ id: participantsId[i] });

    if (userDetails.userType == "admin") {
      for (let a = 0; a < adminLevels.length; a++) {
        if (userDetails.level == adminLevels[a].level) {
          let final = { admin: participantsId[i] };
          let messageType;
          switch (userDetails.level) {
            case 1:
            case 6:
              final.messageType = "general";
              console.log(final)
              return final;
            case 4:
              final.messageType = "product";
              console.log(final);
              return final;
            case 5:
              final.messageType = "project";
              console.log(final);
              return final;
            default:
              return res.status(404).send({
                success: false,
                message: "This type of admin cannot have conversations",
              });
          }
        }
      }
    }
    console.log("not admin");
  }

  return false;
};

exports.chatControl = async (participantsId, conversationType) => {
  const { senderId, recieverId } = participantsId;
  const { admin, messageType } = conversationType;
  const senderdetails = await getUserDetails({ id: senderId });
  const recieverdetails = await getUserDetails({ id: recieverId });

  let one;
  let two;
  if (senderId == admin) {
    two = recieverdetails.userType;
  } else if (recieverId == admin) {
    two = senderdetails.userType;
  } else {
    return false;
  }

  if (messageType == "general") {
    if (
      two == "private_client" ||
      two == "professional" ||
      two == "corporate_client" ||
      two == "vendor"
    ) {
      console.log(two);
      return true;
    } else {
      return "Admin cannot message another admin";
    }
  } else if (messageType == "product") {
    if (two == "vendor" || two == "private_client") {
      return true;
    } else {
      return "You must be a product type user";
    }
  } else if (messageType == "project") {
    if (two == "professional" || two == "corporate_client") {
      return true;
    } else {
      return "You must be a project type user";
    }
  }else{
    return false
  }
};


exports.sendMessage = async (data) => {
  try {
    let {sender_id, receiver_id, message, url, subadmin_room_no} = data;

    const sender_details = await User.findOne({where: {id: sender_id}});
    if (!Boolean(sender_details)) {
      return {message: 'Sender details not found'}
    }

    
    let receiver_details = null;
    if(sender_details.userType === 'admin'){
      receiver_details = await User.findOne({where: {id: receiver_id}});
      if (!Boolean(receiver_details)) {
        return {message: 'Receiver details not found'}
      }
    }else{
      receiver_id = null
    }

    if (sender_details.userType === 'professional') {
      if(!(subadmin_room_no === 5 || subadmin_room_no === 3)){
        return {message: 'You are not permitted to send a message to this admin level.'}
      }
    }else if(sender_details.userType === 'vendor'){
      if(!(subadmin_room_no === 4 || subadmin_room_no === 3)){
        return {message: 'You are not permitted to send a message to this admin level.'}
      }
    }

    // Send message
    await Chats.create({
      sender_id, receiver_id, message, url, subadmin_room_no
    })

    return {
      ...data,
      sender_details: sender_details,
      receiver_details: receiver_details,
    }

  } catch (error) {
    console.log(error)
  }
}


exports.listMessages = async (chat_room) => {
  try {
    
    const chats = await Chats.findAll({where: {subadmin_room_no: chat_room}, include: [
      {
        model: User,
        as: "sender_details",
      },
      {
        model: User,
        as: "receiver_details",
      },
    ], order: [['createdAt', 'ASC']]})

    return chats;
  } catch (error) {
    console.log(error)
  }
}
