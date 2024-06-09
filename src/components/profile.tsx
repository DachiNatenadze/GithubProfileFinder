import React, { ChangeEvent, useEffect, useState } from "react";

interface ProfInfo {
  Repos: number;
  Followers: number;
  Following: number;
  Name: string;
  User: string;
  Location: string;
  Links: string;
  Join: string;
  Description: string;
  ProfilePic: string;
}

export default function Profile() {
  const [user, setUser] = useState<string>("");
  const [profInfo, setProfInfo] = useState<ProfInfo>({
    Repos: 0,
    Followers: 0,
    Following: 0,
    Name: "",
    User: "",
    Location: "",
    Links: "",
    Join: "",
    Description: "",
    ProfilePic: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.github.com/users/${user}`);
        const data = await response.json();
        setProfInfo({
          Repos: data.public_repos,
          Followers: data.followers,
          Following: data.following,
        });
        console.log(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUser(event.target.value);
  };

  return (
    <>
      <main>
        <div className="profile">
          <input type="text" value={user} onChange={handleInputChange} />
          <div>
            <h1></h1>
            <p>Repos: {profInfo.Repos}</p>
            <p>Followers: {profInfo.Followers}</p>
            <p>Following: {profInfo.Following}</p>
          </div>
        </div>
      </main>
    </>
  );
}
