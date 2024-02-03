import {
  YourChannelIcon,
  YoutubeIcon,
  SwitchAccountIcon,
  SignOutIcon,
  AppearanceIcon,
  FeedBackIcon,
  UploadVideoIcon,
  GoLiveIcon,
  CreatePostIcon,
  NewPlaylistIcon,
  NewPodcastIcon,
} from "../../svgs/Svgs";

export const navItems1 = [
  {
    text: "Your channel",
    icon: <YourChannelIcon fill="#909090" />,
  },
  {
    text: "Youtube",
    icon: <YoutubeIcon fill="#909090" />,
  },
  {
    text: "Switch account",
    icon: <SwitchAccountIcon fill="#909090" />,
  },
  {
    text: "Sign out",
    icon: <SignOutIcon fill="#909090" />,
  },
];

export const navItems2 = [
  {
    text: "Appearance: Device theme",
    icon: <AppearanceIcon fill="#909090" />,
  },
  {
    text: "Send feedback",
    icon: <FeedBackIcon fill="#909090" />,
  },
];

export const navItems3 = [
  {
    text: "Upload videos",
    icon: <UploadVideoIcon fill="#AAAAAA" />,
    active: false,
  },
  {
    text: "Go live",
    icon: <GoLiveIcon fill="#AAAAAA" />,
    active: false,
  },
  {
    text: "Create post",
    icon: <CreatePostIcon fill="#AAAAAA" />,
  },
  {
    text: "New playlist",
    icon: <NewPlaylistIcon fill="#AAAAAA" />,
  },
  {
    text: "New podcast",
    icon: <NewPodcastIcon fill="#AAAAAA" />,
  },
];
