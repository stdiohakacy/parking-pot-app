// Function to generate a random license number
export function generateLicenseNo(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let licenseNumber = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        licenseNumber += characters.charAt(randomIndex);
    }

    return licenseNumber;
}
