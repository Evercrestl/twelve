import ResetPasswordClient from "@/components/ResetPasswordClient";

export default function ResetPasswordPage({ searchParams }) {
    const token = searchParams?.token || null;
    
    return <ResetPasswordClient token={token} />;
}
