const nodemailer=require('nodemailer');

require('dotenv').config()

exports.mailsender=async (email,title,body)=>{
    try{
        //create transport
        const transport=nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            port: 587,        // check what happen if we use this and not
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS
            }
        })
        //use transport to send mail
        const mail=await transport.sendMail({
            from:`study notion <${process.env.MAIL_USER}>`,
            to:`${email}`,
            subject:`${title}`,
            html:`${body}`,
        })
        return mail
    }catch(error){
        console.log("something went wrong inside mailsender utility try block");
        return error
    }
}