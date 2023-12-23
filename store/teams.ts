import { defineStore } from "pinia";
import type { Teams } from "~/schemas/Team";
import { v4 as uuidv4 } from "uuid";

export const useTeamsStore = defineStore("teams", () => {
	// ----- STATE -----
	const teams = useState<Teams>("teamsStore", () => ({ teams: [] }));

	// ----- ACTIONS -----
	function CreateTeam() {
		teams.value.teams.push({
			id: uuidv4(),
			text: "",
			colorHex: generateColor(),
			visible: true,
		});
	}

	function RemoveTeam(id: string) {
		teams.value.teams = teams.value.teams.filter((team) => team.id !== id);
	}

	return { teams, CreateTeam, RemoveTeam };
});
