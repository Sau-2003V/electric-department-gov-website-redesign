// 'use server'

// import {z} from 'zod';

// const lschema=z.object({
//     meterNumber:z
//     .string()
//     .min(1,"Meter Number is required.")
//     .regex('/^\d+$','Meter number me sirf digits allow h'),

//     phoneNumber:z
//     .string()
//     .min(10,'Phone number bhi 10 didgits ka hona chahiye kam se kam..')
//     .max(10,'Phone number bhi 10 digits ka hona chhaiye jyada se jyada..')
//     .regex('/^\d{10}$/','Phone number ka format galat h ..')
// });

// export default async function login(prevState,formData)
// {
//     const meterData=formData.get('meterNumber');
//     const phoneData=formData.get('phoneNumber');

//     const checkFields=lschema.safeParse({
//         meterNumber:meterData,
//         phoneNumber:phoneData,
//     });

//     if(!checkFields.success)
//     {
//         return {
//             success:false,
//             errors:checkFields.error.flatten().fieldErrors,
//         };
//     }

//     const {meterNumber,phoneNumber}=checkFields.data;

//     const isValidUser=
//     (meterNumber === "1234567890" && phoneNumber === "9876543210") ||
//     (meterNumber === "0987654321" && phoneNumber === "9123456789") ||
//     (meterNumber === "1122334455"  && phoneNumber === "9988776655");

//     if(isValidUser)
//     {
//         redirect('/');
//     }
//     else
//     {
//       return {
//         success:false,
//         errors:{},
//         message:'Invalid Meter Number or Phone Number ..',
//       };
//     }
// }

"use server";

import { z } from "zod";
import { redirect } from "next/navigation";

const lschema = z.object({
  meterNumber: z
    .string()
    .min(1, "Meter Number is required.")
    .regex(/^\d+$/, "Meter number me sirf digits allow h"),

  phoneNumber: z
    .string()
    .min(10, "Phone number bhi 10 digits ka hona chahiye.")
    .max(10, "Phone number bhi 10 digits ka hona chahiye.")
    .regex(/^\d{10}$/, "Phone number ka format galat h"),
});

export default async function login(prevState, formData) {
  const meterData = formData.get("meterNumber");
  const phoneData = formData.get("phoneNumber");

  const checkFields = lschema.safeParse({
    meterNumber: meterData,
    phoneNumber: phoneData,
  });

  if (!checkFields.success) {
    return {
      success: false,
      errors: checkFields.error.flatten().fieldErrors,
    };
  }

  const { meterNumber, phoneNumber } = checkFields.data;

  const isValidUser =
    (meterNumber === "1234567890" && phoneNumber === "9876543210") ||
    (meterNumber === "0987654321" && phoneNumber === "9123456789") ||
    (meterNumber === "1122334455" && phoneNumber === "9988776655");

  if (isValidUser) {
    redirect("/");
  } else {
    return {
      success: false,
      errors: {},
      message: "Invalid Meter Number or Phone Number.",
    };
  }
}
