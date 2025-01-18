import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store"; // Adjust this import to point to your Redux store type

interface ProtectedProps {
  children: React.ReactNode;
  authentication?: boolean;
}

const Protected: React.FC<ProtectedProps> = ({ children, authentication = true }) => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state: RootState) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      router.push("/logIn");
    } else if (!authentication && authStatus === authentication) {
      router.push("/home");
    } else {
      setLoader(false); // Only set loader to false if no redirection is needed
    }
  }, [authStatus, authentication, router]);

  if (loader) {
    return <h1>Loading...</h1>;
  }

  return <div>{children}</div>;
};

export default Protected;
