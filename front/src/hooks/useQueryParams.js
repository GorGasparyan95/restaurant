import { useLocation } from "react-router";

const useQueryParams = () => new URLSearchParams(useLocation().search);

export default useQueryParams;
