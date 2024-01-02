import { defineStore } from "pinia";
import type { Teams } from "~/schemas/Team";
import { v4 as uuidv4 } from "uuid";

export const useTeamsStore = defineStore("teams", () => {
	// ----- STATE -----
	const teams = useState<Teams>("teamsStore", () => ({
		teams: [
			{
				id: uuidv4(),
				name: "Team1",
				colorHex: generateColor(),
				visible: true,
			},
			{
				id: uuidv4(),
				name: "Team2",
				colorHex: generateColor(),
				visible: true,
			},
			{
				id: uuidv4(),
				name: "Team3",
				colorHex: generateColor(),
				visible: true,
			},
			{
				id: uuidv4(),
				name: "Team4",
				colorHex: generateColor(),
				visible: true,
			},
		],
	}));

	// ----- ACTIONS -----
	function CreateTeam() {
		teams.value.teams.push({
			id: uuidv4(),
			name: "",
			colorHex: generateColor(),
			visible: true,
		});
	}

	function RemoveTeam(id: string) {
		teams.value.teams = teams.value.teams.filter((team) => team.id !== id);
	}

	return { teams, CreateTeam, RemoveTeam };
});
