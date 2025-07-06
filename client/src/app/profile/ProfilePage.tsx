import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Skeleton } from "./../../components/ui/Skeleton";
import { Card, CardContent } from "../../components/ui/Card.tsx";

const ProfilePage = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = {
          username: "username",
          email: "email@example.com",
          role: "admin",
          createdAt: new Date().toISOString(),
        };
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user profile", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [userId]);

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-4 w-32" />
      </div>
    );
  }

  if (!user) {
    return <div className="text-red-300">User not found.</div>;
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-semibold text-white mb-4">Profile</h1>
      <Card className="bg-[#2a0000] border border-red-800 text-red-100">
        <CardContent className="space-y-3 p-6">
          <div>
            <span className="text-red-400">Username:</span> {user.username}
          </div>
          <div>
            <span className="text-red-400">Email:</span> {user.email}
          </div>
          <div>
            <span className="text-red-400">Role:</span> {user.role}
          </div>
          <div>
            <span className="text-red-400">Joined:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
