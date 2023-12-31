export default function (background: string): string {
	const r = parseInt(background.slice(1, 3), 16);
	const g = parseInt(background.slice(3, 5), 16);
	const b = parseInt(background.slice(5, 7), 16);

	const luminance = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

	return (luminance + 0.05) / 0.05 > 7 ? "#000000" : "#FFFFFF";
}
