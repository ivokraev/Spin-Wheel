<script lang="ts" setup>
import { useTeamsStore } from "~/store/teams";

const teamsStore = useTeamsStore();

const { teams } = storeToRefs(teamsStore);

const { CreateTeam, RemoveTeam } = teamsStore;
</script>

<template>
	<v-card :elevation="0">
		<form>
			<div class="overflow-x-auto h-[90vh]">
				<v-sheet
					v-for="team in teams.teams"
					:key="team.id"
					class="d-flex flex-wrap align-center my-14"
				>
					<v-text-field
						label="Team name"
						variant="outlined"
						v-model="team.name"
						:name="`${team.id}.text`"
						type="text"
						class="ma-4 w-[300px]"
						hide-details="auto"
					/>

					<v-color-picker
						:hide-canvas="true"
						v-model="team.colorHex"
						:modes="['hex']"
						elevation="0"
					></v-color-picker>

					<v-btn
						variant="text"
						@click="RemoveTeam(team.id)"
						color="red"
						class="ma-4"
					>
						<v-icon size="36" icon="mdi-close"></v-icon>
					</v-btn>
				</v-sheet>
			</div>
			<v-divider
				:thickness="5"
				class="border-opacity-100 border-neutral-600"
			></v-divider>
			<v-sheet class="d-flex flex-wrap justify-center my-4">
				<v-btn type="button" color="success" @click="CreateTeam"
					>Add</v-btn
				>
			</v-sheet>
		</form>
	</v-card>
</template>
