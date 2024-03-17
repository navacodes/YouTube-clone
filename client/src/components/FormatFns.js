export const formatTimeAgo = function (dateString) {
  const date = new Date(dateString);
  const now = new Date();

  const timeDifference = now - date;
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(months / 12);

  if (years > 0) {
    return years === 1 ? "1 year ago" : `${years} years ago`;
  } else if (months > 0) {
    return months === 1 ? "1 month ago" : `${months} months ago`;
  } else if (weeks > 0) {
    return days === 7 ? "1 week ago" : `${weeks} weeks ago`;
  } else if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return "Just now";
  }
};

export const formatNumber = function (num) {
  if (num < 1000) {
    return num.toString();
  } else if (num < 1000000) {
    const formattedNum = (num / 1000).toFixed(1);
    return formattedNum.endsWith(".0") ? `${formattedNum.slice(0, -2)}k` : `${formattedNum}k`;
  } else {
    const formattedNum = (num / 1000000).toFixed(2);
    return formattedNum.endsWith(".00") ? `${formattedNum.slice(0, -3)}M` : `${formattedNum}M`;
  }
};
export const formatVideoTime = function (totalTime, currentTime) {
  const totalSeconds = Math.floor(totalTime);
  const currentSeconds = Math.floor(currentTime);

  const totalHours = Math.floor(totalSeconds / 3600);
  const totalMinutes = Math.floor((totalSeconds % 3600) / 60);
  const totalSecondsRemaining = totalSeconds % 60;

  const currentHours = Math.floor(currentSeconds / 3600);
  const currentMinutes = Math.floor((currentSeconds % 3600) / 60);
  const currentSecondsRemaining = currentSeconds % 60;

  const formatTime = (value) => (value < 10 ? `0${value}` : `${value}`);

  if (totalTime < 3600) {
    const formattedTotalTime = `${formatTime(totalMinutes)}:${formatTime(totalSecondsRemaining)}`;
    const formattedCurrentTime = `${formatTime(currentMinutes)}:${formatTime(currentSecondsRemaining)}`;
    return { formattedTotalTime, formattedCurrentTime };
  } else {
    const formattedTotalTime = `${formatTime(totalHours)}:${formatTime(totalMinutes)}:${formatTime(totalSecondsRemaining)}`;
    const formattedCurrentTime = `${formatTime(currentHours)}:${formatTime(currentMinutes)}:${formatTime(currentSecondsRemaining)}`;
    return { formattedTotalTime, formattedCurrentTime };
  }
};

export const convertToReadableDate = function (dateString) {
  const options = { month: "short", day: "numeric", year: "numeric" };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", options);
};

export const transformArray = function (arr) {
  const transformedArray = arr.map((obj) => {
    return {
      id: obj._id,
      date: convertToReadableDate(obj.createdAt),
      visibility: obj.privateVid ? "Private" : "Public",
      views: Number(obj.views),
      videoData: {
        mediaUrl: obj.mediaUrl,
        description: obj.description,
        title: obj.title,
        videoId: obj._id,
        cloudinaryPublicId: obj.cloudinaryPublicId,
      },
      restrictions: "None",
      comments: "-",
      likeVsDislike: "-",
    };
  });

  return transformedArray;
};
export const truncateString = function (inputString) {
  const maxLength = 30;

  if (inputString.length > maxLength) {
    return inputString.slice(0, maxLength - 3) + "...";
  }

  return inputString;
};
