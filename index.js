import inquirer from 'inquirer';
import axios from "axios";
const key = "nonlnwza";


function main() {
    const questions = [
        {
            type: 'passsword',
            name: 'barcodeData',
            message: 'Enter Barcode-Data',
            mask: '*'
        }
    ]

    inquirer.prompt(questions).then(async answers => {
        try {
            // const parseToJson = JSON.parse(answers.qrData);
            const getFor_ = answers.barcodeData.startsWith("1") ? "in" : "out";
            const authID = answers.barcodeData.slice(1);
            const response = await axios.post("http://127.0.0.1:808/api/auth/esp/auth_receiver", { 
                secret_key: key, 
                location_auth_id: authID, 
                type: "home", 
                for_: getFor_
            }, {
                headers: {
                    "Content-Type": "application/json",
                }
            });
            const responseData = response.data;
            if(responseData.status === "SUCCESS"){
                console.log("OK : Verification Complete");
            }
            else {
                console.log("ERROR : ", responseData.error);
            }
            main();
        }
        catch(e){
            console.log("ERROR : Please Try Again!");
            main();
        }
    });
}

main();