import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";

const fetchProfile = async () => {
  const res = await api.get("/user/profile");
  return res.data;
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: fetchProfile,
  });
};
