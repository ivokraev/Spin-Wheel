import { z } from "zod";

export const TeamSchema = z.object({
	id: z.string().uuid(),
	name: z.string(),
	colorHex: z.string().min(4).max(9).startsWith("#"),
	visible: z.boolean(),
});

export type Team = z.infer<typeof TeamSchema>;

export const TeamsSchema = z.object({
	teams: TeamSchema.array(),
});

export type Teams = z.infer<typeof TeamsSchema>;
