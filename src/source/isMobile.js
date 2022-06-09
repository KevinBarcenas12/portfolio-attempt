/**
 * Returns true when is a mobile device
 * @returns {boolean} 
 */
export function isMobile() {
    let toMatch = [
      /Android/i,
      /webOS/i,
      /iPhone/i,
      /iPad/i,
      /iPod/i,
      /BlackBerry/i,
      /Windows Phone/i
    ];
    return toMatch.some(item => navigator.userAgent.match(item));
}
