import { Request, Response, NextFunction } from "express";
import axios from "axios";

const getTransactionHistory = async (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (error) {
        next(error);
    }
};

const verifyPayment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        console.log("Inside verify payment");
        console.log(req.body);
        const { token, amount, product_identity, idx }: { token: string; amount: number; product_identity: string; idx: string } = req.body;
        let config = {
            headers: {
                Authorization: `Key ${process.env.KHALTI_SECRET_KEY}`
            }
        };
        const resBody = await axios.post(
            "https://khalti.com/api/v2/payment/verify/",
            {
                token: token,
                amount: amount
            },
            config
        );
        console.log(resBody.data);

        // // TODO : manage user
        // let user: string = req.cookies.uid;
        // await prisma.transaction.create({
        //     data: {
        //         amount: amount,
        //         userId: user,
        //         productsId: product_identity,
        //         khalti_transaction_id: idx
        //     }
        // });
        return res.json({
            message: "Payment Successful"
        });
    } catch (error) {
        next(error);
    }
};

export default { getTransactionHistory, verifyPayment };
