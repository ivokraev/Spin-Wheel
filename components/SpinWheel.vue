<script setup lang="ts">
import { Chart as ChartJS, ArcElement, PieController } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useTeamsStore } from "~/store/teams";
import type { ChartOptions } from "chart.js/dist/types";

ChartJS.register(ArcElement, PieController);

const teamsStore = useTeamsStore();

const { teams } = storeToRefs(teamsStore);

const data = computed(() => ({
	labels: teams.value.teams.map((team) => team.name),
	datasets: [
		{
			backgroundColor: teams.value.teams.map((team) => team.colorHex),
			data: teams.value.teams.map(() => 1),
		},
	],
}));

const options: ChartOptions = {
	responsive: true,
	animation: {
		duration: 0,
	},
	plugins: {
		tooltip: false,
		legend: {
			display: false,
		},
		datalabels: {
			color: "#ffffff",
			formatter: (_, context) =>
				context.chart.data.labels[context.dataIndex],
			font: { size: 24 },
		},
	},
};

const canvas = ref(null);
let chart: ChartJS;

watch(teams.value, () => {
	chart.data = data.value;
	chart.update();
});

onMounted(() => {
	chart = new ChartJS(canvas.value, {
		type: "pie",
		data: data.value,
		plugins: [ChartDataLabels],
		options,
	});
});

let isRotated = false;
const onClick = () => {
	if (chart) {
		isRotated = true;
		chart.options.rotation += 1500;
		chart.options.animation = {
			duration: 5000,
			easing: "easeOutSine",
			onComplete: (event) => {
				if (isRotated) {
					chart.options.animation = {
						duration: 0,
						onComplete: () => {},
					};
					chart.update();
				}
			},
		};
		chart.update();
	}
};
</script>

<template>
	<canvas ref="canvas" @click="onClick" />
	<button @click="onClick">Spin</button>
</template>

<style scoped></style>
