import React from "react";
import useAuth from "../../Hooks/useAuth";

const GoogleLogin = () => {
    const { googleLogin } = useAuth();
    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                const loggedUser = result.user;
                console.log(loggedUser);
            })
            .catch((error) => {
                console.log(error.message);
            });
    };
    return (
        <div className="w-full flex justify-center items-center mb-5 ">
            <img
                onClick={handleGoogleLogin}
                className="w-10 border p-1 rounded-full bg-slate-100 hover:saturate-0 cursor-pointer"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png?20230305195327"
                alt=""
            />
        </div>
    );
};

export default GoogleLogin;
