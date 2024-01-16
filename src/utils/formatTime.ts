const formatTime = (time: number): string => {
    let minutes = Math.floor(time / 60000);
    let seconds = Math.round((time % 60000) / 1000);

    return `${minutes + (minutes == 1 ? " minute " : " minutes ") + seconds + (seconds == 1 ? " second" : " seconds") }`
}

export default formatTime;