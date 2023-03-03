export function formatSeconds(sec: number): string {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60);

    // const minPadding = minutes < 10 ? "0" : "";
    const secPadding = seconds < 10 ? "0" : "";

    return `${minutes}:${secPadding}${seconds}`;
}
