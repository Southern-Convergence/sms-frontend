<template>
	<div class="mx-auto pa-2">
		<v-sheet>
			<v-toolbar color="primary" height="25vh">
				<v-card-title class="text-h5">
					Summary of Reclassification Application
					<v-card-subtitle> A brief overview of a reclassification request.</v-card-subtitle>
				</v-card-title>
				<v-spacer></v-spacer>
				<v-text-field prepend-inner-icon="mdi-magnify" hide-details bg-color="indigo-lighten-5" density="compact" dense />
				<v-btn icon>
					<v-icon>mdi-settings</v-icon>
				</v-btn>
				<template v-slot:extension>
					<v-tabs color="indigo-accent-1" v-model="tab" align-tabs="title">
						<v-tab :value="pending">
							Pending <v-badge color="success" :content="get_pending.length" inline /></v-tab>
						<v-tab :value="approved">
							Approved <v-badge color="success" :content="get_approved.length" inline />
						</v-tab>
						<v-tab color="error" :value="disapproved"> Disapproved <v-badge color="error"
								:content="get_dissapproved.length" inline /></v-tab>
					</v-tabs>
				</template>
			</v-toolbar>

			<v-window v-model="tab">
				<v-window-item value="pending">
					<v-card-text class="overflow-y-auto" style="height: 75vh">
						<v-row dense>
							<v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12" v-for="(a, index) in get_pending" :key="index">
								<v-card class="mx-auto" color="indigo" elevation="2" variant="tonal">
									<v-card-item>
										<div class="d-flex">
											<div class="text-overline mb-1">
												Control Number : <b> {{ a.control_no }}</b>
											</div>
											<v-spacer />
											<div class="text-overline mb-1">
												Date Applied : <b> {{ a.date }}</b>
											</div>
										</div>
										<div>
											<div class="text-body-1 mb-1 ">
												Position : <b>{{ a.position }}</b>
											</div>
											<div class="text-body-2"> Name : <b class="text-capitalize">{{ a.surname }}, {{
												a.givenname }} </b>
											</div>
											<div class="text-body-2"> School : {{ a.school }}</div>
											<div class="text-body-2"> Division : {{ a.division }}</div>
										</div>
									</v-card-item>

									<v-card-actions>
										<v-btn @click="show_others(a)" density="compact" color="primary" variant="tonal">
											View Application
										</v-btn>
										<v-spacer /> <span> Status : <v-chip class="font-weight-bold"> {{ a.status
										}}</v-chip></span>
									</v-card-actions>
								</v-card>
							</v-col>
						</v-row>
					</v-card-text>
				</v-window-item>

				<v-window-item value="approved">
					<v-card-text class="overflow-y-auto" style="height: 75vh">
						<v-row dense>
							<v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12" v-for="(a, index) in get_approved" :key="index">
								<v-card class="mx-auto" color="indigo" elevation="2" variant="tonal">

									<v-card-item>
										<div class="d-flex">
											<div class="text-overline mb-1">
												Control Number : <b> {{ a.control_no }}</b>
											</div>
											<v-spacer />
											<div class="text-overline mb-1">
												Date Applied : <b> {{ a.date }}</b>
											</div>
										</div>
										<div>
											<div class="text-body-1 mb-1 ">
												Position : <b>{{ a.position }}</b>
											</div>
											<div class="text-body-2"> Name : <b class="text-capitalize">{{ a.surname }}, {{
												a.givenname }} </b>
											</div>
											<div class="text-body-2"> School : {{ a.school }}</div>
											<div class="text-body-2"> Division : {{ a.division }}</div>
										</div>
									</v-card-item>
									<v-card-actions>
										<v-btn @click="show_others(a)" density="compact" color="primary" variant="tonal">View
											Application</v-btn>
										<v-spacer />
										<span> Status : <v-chip color="success" class="font-weight-bold"> {{ a.status
										}}</v-chip></span>
									</v-card-actions>
								</v-card>
							</v-col>
						</v-row>

					</v-card-text>
				</v-window-item>

				<v-window-item value="disapproved">
					<v-card-text class="overflow-y-auto" style="height: 75vh">
						<v-row>
							<v-col cols="12" xxl="4" xl="4" lg="6" md="6" sm="12" v-for="(a, index) in get_dissapproved" :key="index">
								<v-card class="mx-auto" color="indigo" elevation="2" variant="tonal">
									<v-card-item>
										<div class="d-flex">
											<div class="text-overline mb-1">
												Control Number : <b> {{ a.control_no }}</b>
											</div>
											<v-spacer />
											<div class="text-overline mb-1">
												Date Applied : <b> {{ a.date }}</b>
											</div>
										</div>
										<div>
											<div class="text-body-1 mb-1 ">
												Position : <b>{{ a.position }}</b>
											</div>
											<div class="text-body-2"> Name : <b class="text-capitalize">{{ a.surname }}, {{
												a.givenname }} </b>
											</div>
											<div class="text-body-2"> School : {{ a.school }}</div>
											<div class="text-body-2"> Division : {{ a.division }}</div>
										</div>
									</v-card-item>
									<v-card-actions>
										<v-btn @click="show_others(a)" density="compact" color="primary" variant="tonal">
											View Application
										</v-btn>
										<v-spacer />
										<span> Status : <v-chip color="error" class="font-weight-bold"> {{ a.status
										}}</v-chip></span>
									</v-card-actions>
								</v-card>
							</v-col>
						</v-row>
					</v-card-text>
				</v-window-item>
			</v-window>
		</v-sheet>

		<!-- Dialog -->
		<v-dialog v-model="view_applicant.dialog" max-width="60%">
			<v-card>
				<v-toolbar color="indigo" border>
					<v-list-item class="pl-2" density="compact">
						<template v-slot:prepend>
							<v-avatar class="mr-1" variant="text">
								<v-icon icon="mdi-account" dark />
							</v-avatar>
						</template>
						<v-list-item-title> Applicant Information</v-list-item-title>
						<v-list-item-subtitle> background and Qualifications</v-list-item-subtitle>
					</v-list-item>
					<v-spacer />
					<v-btn @click="view_applicant.dialog = false" class="mr-0" rounded="0" icon="mdi-close" />
				</v-toolbar>
				<v-card-text>
					<v-row dense>
						<v-col cols="6">
							Applicant Name: <b class="text-uppercase">{{ `${selected_application.surname},
															${selected_application.givenname}
								` }}
							</b>
						</v-col>

						<v-col cols="6" class="font-weight-bold"> CONTROL NUMBER : <v-chip class="font-weight-bold" color="primary">{{
							selected_application.control_no }}</v-chip></v-col>
						<v-col cols="6">
							Current Position: <b class="text-grey">{{ selected_application.current_position }}</b>
						</v-col>
						<v-col cols="6">
							Employee No: <b class="text-grey"> {{ selected_application.employee_no }}</b>
						</v-col>
						<v-col cols="6">
							Plantilla No: <b class="text-grey">{{ selected_application.plantilla_no }}</b>
						</v-col>
						<v-col cols="6">
							Division: <b class="text-grey"> {{ selected_application.division }}</b>
						</v-col>
						<v-col cols="6">
							School: <b class="text-grey"> {{ selected_application.school }}</b>
						</v-col>
						<v-col cols="12" class="mt-4 font-weight-bold "> <v-icon class="mr-2 pb-2" size="26"
								color="primary">mdi-seal</v-icon>
							Background and Qualification</v-col> <v-divider />
						<v-col cols="12">
							Reclass Position : <v-chip color="primary" class="font-weight-bold"> Teacher II</v-chip>
						</v-col>
						<v-col cols="6" v-if="selected_application.education"> Education:
							<v-textarea rows="3" bg-color="grey-lighten-4" :model-value="selected_application.education" variant="solo"
								readonly />
						</v-col>

						<v-col cols="6" v-if="selected_application.experience"> Experience:<v-textarea rows="3"
								bg-color="grey-lighten-4" :model-value="selected_application.experience" variant="solo" readonly />
						</v-col>
						<v-col cols="6" v-if="selected_application.training"> Training:<v-textarea rows="3" bg-color="grey-lighten-4"
								:model-value="selected_application.training" variant="solo" readonly />
						</v-col>
						<v-col cols="6" v-if="selected_application.eligibility"> Eligibility:<v-textarea rows="3"
								bg-color="grey-lighten-4" :model-value="selected_application.eligibility" variant="solo" readonly />
						</v-col>
						<v-col cols="6" v-if="selected_application.performance_rating"> Performance Rating:<v-textarea rows="3"
								bg-color="grey-lighten-4" :model-value="selected_application.performance_rating" variant="solo"
								readonly />
						</v-col>
						<!-- <v-col cols="12">
							<v-list lines="auto" density="compact">
								<v-list-item>
									<v-list-item-title>Education : </v-list-item-title>
									<v-list-item-subtitle class="text-justify">
										{{ selected_application.performance_rating }}
									</v-list-item-subtitle>
								</v-list-item>
								<v-list-item>
									<v-list-item-title>Experience : </v-list-item-title>
									<v-list-item-subtitle class="text-justify">
										{{ selected_application.experience }}
									</v-list-item-subtitle>
								</v-list-item>
								<v-list-item>
									<v-list-item-title>Training : </v-list-item-title>
									<v-list-item-subtitle class="text-justify">
										{{ selected_application.training }}
									</v-list-item-subtitle>
								</v-list-item>
								<v-list-item>
									<v-list-item-title>Performance Rating : </v-list-item-title>
									<v-list-item-subtitle class="text-justify">
										{{ selected_application.performance_rating }}
									</v-list-item-subtitle>
								</v-list-item>
							</v-list>
						</v-col> -->

					</v-row>
				</v-card-text>
				<v-divider />
				<v-card-actions>
					<v-row dense justify="center">
						<v-col cols="4">
							<v-btn @click="disapproved_dialog = true" variant="tonal" color="error" block>Disapproved</v-btn>
						</v-col>
						<v-col cols="4">
							<v-btn @click="approved_dialog = true" variant="tonal" color="success" block>
								Approved
							</v-btn>
						</v-col>
					</v-row>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="disapproved_dialog" max-width="25%">
			<v-card>
				<v-card-text class="ma-4">
					<span>Reason : </span>
					<v-textarea v-model="reason" />
				</v-card-text>
				<v-divider />
				<v-card-actions>
					<v-row dense justify="center">
						<v-col cols="4">
							<v-btn @click="disapproved_dialog = false" variant="tonal" color="error" block>Cancel</v-btn>
						</v-col>
						<v-col cols="4">
							<v-btn @click="disapproved_applicant(selected_application)" variant="tonal" color="success" block>
								Disapproved
							</v-btn>
						</v-col>
					</v-row>
				</v-card-actions>
			</v-card>
		</v-dialog>
		<v-dialog v-model="approved_dialog" max-width="30%">
			<v-card>
				<v-card-text class="ma-5">
					<center> <v-icon size="78">mdi-chat-question</v-icon></center>
					<center>
						Please confirm if this application is approved. Upon approval, the applicant will
						receive an email to submit other requirements. </center>
				</v-card-text>
				<v-divider />
				<v-card-actions>
					<v-row dense justify="center">
						<v-col cols="4">
							<v-btn @click="approved_dialog = false" variant="tonal" color="error" block>Cancel</v-btn>
						</v-col>
						<v-col cols="4">
							<v-btn @click="approved_applicant(selected_application)" variant="tonal" color="success" block>
								Submit
							</v-btn>
						</v-col>
					</v-row>
				</v-card-actions>
			</v-card>
		</v-dialog>
	</div>
</template>

<script setup lang="ts">
import swal from 'sweetalert';
const { $rest } = useNuxtApp();

definePageMeta({ layout: "std-systems" })

onBeforeMount(() => {
	get_application()
})

const tab = ref(10);

interface Application {
	middlename: string;
	surname: string;
	givenname: string;
	control_no: string;
	current_position: string;
	employee_no: string;
	plantilla_no: string;
	division: string;
	school: string;
}

const view_applicant = ref({
	dialog: false,
	title: 'Applciant Initial Information',
	subtitle: 'Your educational background and civil service information',
});

const disapproved_dialog = ref(false);
const approved_dialog = ref(false);
const selected_application = ref({} as Application);

function show_others(item: any) {
	selected_application.value = item;
	view_applicant.value.dialog = true;
}

const application_data = ref([])
async function get_application() {
	const { data, error } = await $rest('applicant/get-application', {
		method: "GET"
	});
	application_data.value = data;
}

const get_pending = computed(() => {
	return application_data.value.filter((i) => i.status == 'Pending');
})

const get_approved = computed(() => {
	return application_data.value.filter((i) => i.status == 'Approved');
})

const get_dissapproved = computed(() => {
	return application_data.value.filter((i) => i.status == 'Dissapproved');
})

const reason = ref('')
// Dissapproved Application
async function disapproved_applicant(item: any) {
	const { data, error } = await $rest('applicant/dissapproved-application', {
		method: "POST",
		body: {
			id: item._id,
			applicants_data: { ...item },
			reason: reason.value,
		}
	})
	if (!error) return swal({ title: data, icon: "success" })
	return swal({ title: data, icon: "error" })
}
// End

async function approved_applicant(item: any) {
	const { data, error } = await $rest('applicant/approved-application', {
		method: "POST",
		body: {
			id: item._id,
			applicants_data: { ...item },
			link: `${window.origin}/sms/applicant`
		},
	})
	if (error) return swal({ title: "Error", text: error, icon: "error", buttons: { ok: false, cancel: false } })
	return swal({ title: "Sucess", text: data, icon: "success", buttons: { ok: false, cancel: false } })

}

</script>
