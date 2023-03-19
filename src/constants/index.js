import { toram_online, genshin_impact, aqw, tower_of_fantasy, mobile_legends, crossfire, league_of_legends, minecraft } from  "../assets"
import { faHome, faUser, faFolder, faGamepad, faStore, faBoxArchive, faGear, faRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export const nav_links = [
  {
    path: "",
    name: "Home",
    icon: faHome
  },
  {
    path: "portfolio",
    name: "Portfolio",
    icon: faFolder
  },
  {
    path: "games",
    name: "Games",
    icon: faGamepad
  },
  {
    path: "store",
    name: "Store",
    icon: faStore
  },
  {
    path: "archive",
    name: "Archive",
    icon: faBoxArchive
  },
]

export const user_navLinks = [
  {
    id: "account",
    title: "Account",
    icon: faUser,
  },
  {
    id: "settings",
    title: "Settings",
    icon: faGear
  },
  {
    id: "logout",
    title: "Logout",
    icon: faRightFromBracket
  }
];

export const game_list = [
  {
    image: toram_online,
    title: "Toram Online",
    link: "#"
  },
  {
    image: genshin_impact,
    title: "Genshin Impact",
    link: "#"
  },
  {
    image: tower_of_fantasy,
    title: "Tower of Fantasy",
    link: "#"
  },
  {
    image: mobile_legends,
    title: "Mobile Legends",
    link: "#"
  },
  {
    image: league_of_legends,
    title: "League of Legends",
    link: "#"
  },
  {
    image: aqw,
    title: "Adventure Quest Worlds",
    link: "#"
  },
  {
    image: crossfire,
    title: "Crossfire",
    link: "#"
  },
  {
    image: minecraft,
    title: "Minecraft",
    link: "#"
  },
]

export const stats = [
  {
    id: "stats-1",
    title: "User Active",
    value: "3800+",
  },
  {
    id: "stats-2",
    title: "Trusted by Company",
    value: "230+",
  },
  {
    id: "stats-3",
    title: "Transaction",
    value: "$230M+",
  },
];
