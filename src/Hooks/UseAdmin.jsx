import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

import CustomLoader from "../Components/customLoader/CustomLoader";
import UseAxiosSecure from "./UseAxiosSecure";

const UseAdmin = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return <CustomLoader></CustomLoader>;
    }
    if (user) {
        const [axiosSecure] = UseAxiosSecure();
        const { data: isAdmin, isLoading: isAdminLoading } = useQuery({
            queryKey: ["isAdmin", user?.email],
            queryFn: async () => {
                const res = await axiosSecure.get(
                    `/users/admin/${user?.email}`
                );
                return res.data.result.admin;
            },
        });
        return { isAdmin, isAdminLoading };
    } else {
        return { isAdmin: null, isAdminLoading: null };
    }
};
export default UseAdmin;
