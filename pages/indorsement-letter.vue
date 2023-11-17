<template>
    <div class="main-container">
        <v-sheet border class="mx-auto a4-sheet">
            <commons-header />
            <v-card-text>
                <div class="text-center mt-8">1st Indorsement</div>
                <div class="text-center">August 31, 2023</div>

                <div class="px-15 mt-5 text-justify">
                    Respectfully transmitted to Ms. RUBY P. MURO, Regional Director,
                    Department of Budget and Management, National Capital Region, 2nd Floor
                    Arcache Building General Solano, Corner Nepomuceno St, San Miguel,
                    Manila, the herein request for reclassification of position of
                    <span class="text-blue">Ms. PERPETUA I. REBUA, from Teacher III to Master Teacher I, Concepcion
                        Integrated
                        School – Secondary Level, Division of Marikina City, </span> this Region,
                    chargeable against the lumpsum appropriation for reclassification of
                    positions for CY <span class="text-blue">2023 </span>.
                </div>

                <div class="align-end text-center" style="margin-top: 40px; width: 30%">
                    <b>MARIANNE MAE PACLIAN</b> <br /> Regional Director
                </div>

                <div style="margin-top: 40px">
                    Incls: <span class="text-blue">1. Recommendation from SDS</span>
                </div>
                <div class="pl-10 text-blue">2. PAL</div>
                <div class="pl-10 text-blue">3. Evaluation Sheet</div>
                <div class="pl-10 text-blue">4. List of Teachers</div>
                <div class="pl-10 text-blue">5. Rank List</div>

                <div style="margin-top: 40px"> Copy furnished :</div>
                <div class="ml-10 text-blue"> Schools Division Superintendent</div>
                <div class="ml-10 text-blue"> Division of Blank City</div>
            </v-card-text>
            <v-divider />
            <commons-footer />
        </v-sheet>
    </div>
</template>

<style scoped>
.main-container {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}

.a4-sheet {
    width: 210mm;
    height: 297mm;
    margin: 0 auto;
}

* {
    font-size: 16px
}
</style>
