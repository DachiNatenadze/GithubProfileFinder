import React, { ChangeEvent, useEffect, useState } from "react";

interface ProfInfo {
  Repos: number;
  Followers: number;
  Following: number;
  Name: string;
  User: string;
  Location: string;
  Links: {
    html_url: string;
    followers_url: string;
    following_url: string;
    repos_url: string;
  };
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
    Links: {
      html_url: "",
      followers_url: "",
      following_url: "",
      repos_url: "",
    },
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
          Name: data.name || data.login,
          User: data.login,
          Location: data.location || "",
          Links: {
            html_url: data.html_url,
            followers_url: data.followers_url,
            following_url: data.following_url,
            repos_url: data.repos_url,
          },
          Join: data.created_at,
          Description: data.bio || "",
          ProfilePic: data.avatar_url,
        });
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
            <h1>{profInfo.Name}</h1>
            <img src={profInfo.ProfilePic} alt="Profile" />
            <p>Repos: {profInfo.Repos}</p>
            <p>Followers: {profInfo.Followers}</p>
            <p>Following: {profInfo.Following}</p>
            <p>Description: {profInfo.Description}</p>
            <p>Location: {profInfo.Location}</p>
            {/* Add links */}
            <p>
              GitHub: <a href={profInfo.Links.html_url}>{profInfo.User}</a>
            </p>
            <p>
              Followers:{" "}
              <a href={profInfo.Links.followers_url}>{profInfo.Followers}</a>
            </p>
            <p>
              Following:{" "}
              <a href={profInfo.Links.following_url}>{profInfo.Following}</a>
            </p>
            <p>
              Repositories:{" "}
              <a href={profInfo.Links.repos_url}>{profInfo.Repos}</a>
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
