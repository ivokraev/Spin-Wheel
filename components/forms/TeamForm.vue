<script lang="ts" setup>
import { Field, useFieldArray, useForm } from "vee-validate";
import { type Team, TeamsSchema } from "@/schemas/Team";

import { v4 as uuidv4 } from "uuid";
import { toTypedSchema } from "@vee-validate/zod";

const { handleSubmit } = useForm({
	validationSchema: toTypedSchema(TeamsSchema),
	initialValues: {
		teams: [],
	},
});

const { remove, push, fields } = useFieldArray<Team>("teams");

const onRemove = (uuid: string) =>
	remove(fields.value.findIndex((team) => team.value.id === uuid));

const onPush = () =>
	push({
		id: uuidv4(),
		text: "",
		colorHex: generateColor(),
		visible: true,
	});

const onSubmit = handleSubmit((values) => {
	console.log(values);
});
</script>

<template>
	<form novalidate @submit="onSubmit">
		<div
			v-for="(field, idx) in fields"
			:key="field.value.id"
			class="flex flex-row"
		>
			<Field :name="`teams[${idx}].text`" type="text" />

			<Field :name="`teams[${idx}].colorHex`" type="text" />

			<div
				:style="{ backgroundColor: field.value.colorHex }"
				class="w-8 h-8"
			/>

			<button type="button" @click="onRemove(field.value.id)">X</button>
		</div>
		<button type="button" @click="onPush">Add</button>
		<button type="submit">Submit</button>
	</form>
</template>
