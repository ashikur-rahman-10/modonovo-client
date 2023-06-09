import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";

import CustomLoader from "../Components/customLoader/CustomLoader";
import UseAxiosSecure from "./UseAxiosSecure";

const UseInstructor = () => {
    const { user, loading } = useAuth();
    if (loading) {
        return <CustomLoader></CustomLoader>;
    }

    const [axiosSecure] = UseAxiosSecure();
    const { data: isInstructor, isLoading: isInstructorLoading } = useQuery({
        queryKey: ["isInstructor", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(
                `/users/instructors/${user?.email}`
            );
            return res.data.result.instructor;
        },
    });
    return { isInstructor, isInstructorLoading };
};
export default UseInstructor;
