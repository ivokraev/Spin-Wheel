<script lang="ts" setup>
import { Field } from "vee-validate";
import { useTeamsStore } from "~/store/teams";

const teamsStore = useTeamsStore();

const { teams } = storeToRefs(teamsStore);

const { CreateTeam, RemoveTeam } = teamsStore;
</script>

<template>
	<form>
		<div v-for="team in teams.teams" :key="team.id" class="flex flex-row">
			<Field v-model="team.name" :name="`${team.id}.text`" type="text" />

			<Field
				v-model="team.colorHex"
				:name="`${team.id}.colorHex`"
				type="text"
			/>

			<div :style="{ backgroundColor: team.colorHex }" class="w-8 h-8" />

			<button type="button" @click="RemoveTeam(team.id)">X</button>
		</div>
		<button type="button" @click="CreateTeam">Add</button>
	</form>
</template>
