<template>
  <div>
    <!-- PAGE 1 -->

    <body class="printable-page">
      <div class="content">
        <div class="pds-title">CS Form No. 212</div>
        <div class="pds-title">Revised 2017</div>
        <center style="font-size: 24px;  font-family: Arial Black">
          PERSONAL DATA SHEET
        </center>
        <div class="pds-title">
          WARNING: Any misrepresentation made in the Personal Data Sheet and the
          Work Experience Sheet shall cause the filing of administrative/criminal
          case/s against the person concerned.
        </div>
        <div class="pds-title">
          READ THE ATTACHED GUIDE TO FILLING OUT THE PERSONAL DATA SHEET (PDS)
          BEFORE ACCOMPLISHING THE PDS FORM.
        </div>
        <div style="line-height: normal; font-size: 9px; font-weight: bold ;display: flex; ">
          <div width="70%"> Print legibly. Tick appropriate boxes () and use separate sheet if
            necessary. Indicate N/A if not applicable. DO NOT ABBREVIATE</div>

          <div style="width: 30%; margin-left: auto;">
            <table style="border-collapse: collapse; margin-bottom: 1px ">
              <tr>
                <td style="border: 1px solid black; padding: 1px; font-size: 9px; background-color:  rgb(155, 152, 152);">
                  1.CS ID No.</td>
                <td style="border: 1px solid black; padding: 1px; font-size: 9px; text-align: end">(Do not fill up. For
                  CSC use only)</td>
              </tr>
            </table>
          </div>

        </div>



        <div>
          <table>
            <thead>
              <tr>
                <th colspan="4" style="text-align: left; font-style: italic" class="header-title">
                  I.PERSONAL INFORMATION
                </th>
              </tr>
            </thead>
            <tbody>
              <tr colspan="2">
                <td rowspan="3" width="20%">
                  <span class="row-value"> 2. <span style="  font-size: 8px;">SURNAME</span> </span>
                  <br />

                  <span class="pl-2 row-value">FIRST NAME</span> <br />

                  <span class="pl-2 row-value">MIDDLE NAME</span>
                </td>
                <td width="85%">Lastname</td>
              </tr>
              <tr>
                <td>Firstname</td>
              </tr>
              <tr>
                <td>Middlename</td>
              </tr>
            </tbody>
          </table>

          <table>
            <tr>
              <td width="20%">3. DATE OF BIRTH</td>
              <td width="20%">Date of Birth</td>
              <td rowspan="4" width="20%">
                <v-row no-gutters> 16. CITIZENSHIP</v-row>
                <h4>&nbsp;</h4>
                <center>If holder of dual citizenship</center>
                <center>please indicate the details.</center>
              </td>
              <td rowspan="4" width="40%">
                <v-row no-gutters>
                  <v-col cols="4">
                    <input type="checkbox" />
                    <label for="single">Filipino</label>
                  </v-col>
                  <v-col cols="4">
                    <input type="checkbox" />
                    <label for="married">Dual Citizenship</label>
                  </v-col>
                </v-row>
                <v-row no-gutters justify="end">
                  <v-col cols="4">
                    <input type="checkbox" />
                    <label for="widowed">by birth</label></v-col>
                  <v-col cols="4">
                    <input type="checkbox" />
                    <label for="separated">by naturalization</label></v-col>
                  <v-col cols="8"> Please indicate country :</v-col>
                  <v-col cols="12">&nbsp;</v-col>
                </v-row>
              </td>
            </tr>

            <tr>
              <td>4. Place of Birth</td>
              <td></td>
            </tr>
            <tr>
              <td>5. Sex</td>
              <td>
                <v-row no-gutters>
                  <v-col cols="4">
                    <input type="checkbox" />
                    <label for="single">Male</label>
                  </v-col>
                  <v-col cols="4">
                    <input type="checkbox" />
                    <label for="married">Female</label>
                  </v-col>
                </v-row>
              </td>
            </tr>
          </table>
          <table>
            <tbody>
              <tr colspan="4">
                <td width="20%">6. Civil Status</td>
                <td width="20%">
                  <v-row no-gutters>
                    <v-col cols="6">
                      <input type="checkbox" />
                      <label for="single">Single</label>
                    </v-col>
                    <v-col cols="6">
                      <input type="checkbox" />
                      <label for="married">Married</label>
                    </v-col>

                    <v-col cols="6">
                      <input type="checkbox" />
                      <label for="widowed">Widowed</label></v-col>
                    <v-col cols="6">
                      <input type="checkbox" />
                      <label for="separated">Separated</label></v-col>
                    <v-col cols="6">
                      <input type="checkbox" />
                      <label for="other">Other/s</label></v-col>
                  </v-row>
                </td>
                <td width="15%" rowspan="2">
                  17. RESIDENTIAL ADDRESS
                </td>

                <td width="45%" style="padding: 0;
;">
                  <div style="display: flex; border-bottom: 1px solid lightgrey">

                    <div style="width: 60%">Province</div>
                    <div style="width: 40%">Street </div>

                  </div>
                  <div style="display: flex; font-style: italic; font-size:7px">
                    <div style="width: 60%">House/Block/Lot No.</div>
                    <div style="width: 40%">Street</div>

                  </div>
                  <!-- <v-divider class="my-2" color=""></v-divider> -->
                  <div style="display: flex; border-bottom: 1px solid lightgrey; border-top: 1px solid black;">

                    <div style="width: 60%; margin-top: 2mm">Province
                    </div>
                    <div style="width: 40%;  margin-top: 2mm">Street
                    </div>

                  </div>
                  <div style="display: flex;  font-style: italic; font-size:7px">
                    <div style="width: 60%">Subdivision/Village</div>
                    <div style="width: 40%">Barangay</div>

                  </div>
                  <!-- <v-row no-gutters>
                          <v-col cols="8">House/Block/Lot No.</v-col>
                          <v-col cols="4">Street</v-col>
                          <v-col cols="8">{{user.personal_information.residential_address.province}}</v-col>
                          <v-col cols="4">{{ user.personal_information.residential_address.street }}</v-col>
                        </v-row> -->
                </td>

              </tr>
              <tr>
                <td>7. HEIGHT</td>
                <td>Height cm</td>


                <td style="padding: 0;
">
                  <div style="display: flex; border-bottom: lightgrey 1px solid">

                    <div style="width: 60%">Province</div>
                    <div style="width: 40%">Street </div>

                  </div>
                  <div style="display: flex;  font-style: italic; font-size:7px">
                    <div style="width: 60%">City/Municipality</div>
                    <div style="width: 40%">Province</div>

                  </div>
                </td>

              </tr>
              <tr>
                <td>8. WEIGHT</td>
                <td>Weight pounds</td>
                <td class="text-center">ZIP CODE</td>
              </tr>
            </tbody>

            <tbody>
              <tr>
                <td width="20%">9. BLOOD TYPE</td>
                <td width="20%">Blood type</td>
                <td width="15%" rowspan="3">18. PERMANENT ADDRESS</td>
                <td width="45%" style="padding-left: 0; padding-right:0">
                  <div style="display: flex; border-bottom: 1px solid lightgrey">

                    <div style="width: 60%">Province</div>
                    <div style="width: 40%">Street</div>

                  </div>
                  <div style="display: flex; font-style: italic; font-size:7px">
                    <div style="width: 60%">House/Block/Lot No.</div>
                    <div style="width: 40%">Street</div>

                  </div>

                </td>
              </tr>


              <tr>
                <td>10. GSIS ID NO.</td>
                <td>GSIS</td>
                <td style="padding-left: 0; padding-right:0">
                  <div style="display: flex; border-bottom: 1px solid lightgrey">

                    <div style="width: 60%">Province</div>
                    <div style="width: 40%">Street</div>

                  </div>
                  <div style="display: flex; font-style: italic; font-size:7px">
                    <div style="width: 60%">Subdivision/Village</div>
                    <div style="width: 40%">Barangay</div>

                  </div>
                </td>
              </tr>
              <tr>
                <td>11. PAGIBIG ID NO</td>
                <td>Pagibig</td>
                <td style="padding-left: 0; padding-right:0">
                  <div style="display: flex; border-bottom: lightgrey 1px solid">

                    <div style="width: 60%">Province</div>
                    <div style="width: 40%">Street </div>

                  </div>
                  <div style="display: flex;  font-style: italic; font-size:7px">
                    <div style="width: 60%">City/Municipality</div>
                    <div style="width: 40%">Province</div>

                  </div>
                </td>
              </tr>
              <tr>
                <td>12. PHILHEALTH ID NO</td>
                <td>Philhealth</td>
                <td class="text-center"> ZIP CODE</td>
              </tr>
              <tr>
                <td width="20%">13. SSS NO.</td>
                <td width="20%">SSS</td>
                <td width="15%">19. TELEPHONE NO.</td>
                <td width="45%">Telephone number</td>
              </tr>
              <tr>
                <td width="20%">14. TIN NO.</td>
                <td width="20%">Tax Number</td>
                <td width="15%">20. MOBILE NO.</td>
                <td width="45%">Contact Number</td>
              </tr>

              <tr>
                <td width="20%">15. AGENCY EMPLOYEE NO.</td>
                <td width="20%">Agency ID</td>
                <td width="15%">21. EMAIL ADDRESS (if any)</td>
                <td width="45%">Email</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th colspan="5" style="text-align: left; font-style: italic" class="header-title">
                  II. FAMILY BACKGROUND
                </th>
              </tr>
            </thead>
            <tbody>
              <tr colspan="4">
                <td rowspan="3" width="20%">
                  <span class="row-value"> 22. SPOUSE'S SURNAME </span> <br />

                  <span class="row-value pl-2">FIRST NAME</span> <br />
                  <span class="row-value pl-2">MIDDLE NAME</span>
                </td>
                <td width="40%">Spouse Name</td>
                <td>23. NAME of CHILDREN (Write full name ans list all)</td>
                <td>DATE OF BIRTH (mm/dd/yyyy)</td>
              </tr>
              <tr>
                <td>
                  <div style="display: inline-block; width: 60%; height: 100% "> Name </div>
                  <div style="flex-grow: 1;display: inline-block; width:40%; font-size: 7px ;height: 100%;  "> NAME
                    EXTENSION (JR., SR)</div>
                </td>

                <td> </td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td> Name Spouse</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr colspan="4">
                <td class="pl-2">OCCUPATION</td>
                <td>Occupation</td>
                <td></td>
                <td></td>
              </tr>
              <tr colspan="4">
                <td class="pl-2">EMPLOYER/BUSINESS NAME</td>
                <td>Employer</td>
                <td></td>
                <td></td>
              </tr>
              <tr colspan="4">
                <td class="pl-2">BUSINESS ADDRESS</td>
                <td>Business Address</td>
                <td></td>
                <td></td>
              </tr>
              <tr colspan="4">
                <td class="pl-2">TELEPHONE NO.</td>
                <td>Telephone Number</td>
                <td></td>
                <td></td>
              </tr>
              <tr colspan="4">
                <td rowspan="3" width="20%">
                  <span class="row-value"> 24. FATHER'S SURNAME</span> <br />

                  <span class="row-value pl-2">FIRST NAME</span> <br />

                  <span class="row-value pl-2">MIDDLE NAME</span>
                </td>
                <td>
                  <div style="display: inline-block; width: 60%; height: 100% "> Father Name </div>
                  <div style="flex-grow: 1;display: inline-block; width:40%; font-size: 7px ;height: 100%;   "> NAME
                    EXTENSION (JR., SR)</div>
                </td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td> Father Name</td>


                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Father Name</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr colspan="4">
                <td rowspan="4" width="20%">
                  <span class="row-value"> 25. MOTHER'S MAIDEN NAME </span>
                  <br />
                  <span class="row-value pl-2">SURNAME</span> <br />
                  <span class="row-value pl-2">FIRST NAME</span> <br />

                  <span class="row-value pl-2">MIDDLE NAME</span>
                </td>
                <td width="40%" style="border-right: none">&nbsp;</td>
                <td>&nbsp;</td>

              </tr>
              <tr>
                <td>Mother Name</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Mother Name</td>
                <td>&nbsp;</td>
                <td>&nbsp;</td>
              </tr>
              <tr>
                <td>Mother Name</td>


                <td colspan="2" class="note">( Continue on separate sheet if necessary )</td>
              </tr>

            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th colspan="8" style="text-align: left; font-style: italic" class="header-title">
                  III. EDUCATIONAL BACKGROUND
                </th>
              </tr>
              <tr colspan="8">
                <th rowspan="2" width="20%">26. LEVEL</th>
                <th rowspan="2" width="20%">NAME OF SCHOOL</th>
                <th rowspan="2" width="20%">BASIC EDUCATION/DEGREE/COURSE <br />(Write in full)</th>
                <th colspan="2" width="10%">PERIOD OF ATTENDANCE</th>
                <th rowspan="2" width="10%">HIGHEST LEVEL/ UNIT EARNED <br /> (If not graduated) </th>
                <th rowspan="2" width="10%">YEAR GRADUATED</th>
                <th rowspan="2" width="10%">
                  SCHOLARSHIP/ACADEMIC HONORS RECEIVED
                </th>
              </tr>
              <tr colspan="8">
                <th width="5%">FROM</th>
                <th width="5%">TO</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="pl-3">ELEMENTARY</td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>

              </tr>
              <tr>
                <td class="pl-3">SECONDARY</td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
                <td> </td>
              </tr>
              <tr>
                <td class="pl-3">VOCATIONAL/TRADE COURSE</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>

              <tr>
                <td class="pl-3">COURSE</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td class="pl-3">GRADUATE STADIES</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td colspan="8" class="note">
                  ( Continue on separate sheet if necessary )
                </td>
              </tr>
              <tr>
                <td class="font-weight-bold text-center"> SIGNATURE</td>
                <td colspan="2"></td>
                <td colspan="2" class="font-weight-bold text-center">DATE</td>
                <td colspan="6"></td>
              </tr>


            </tbody>
          </table>
        </div>


      </div>
      <!-- <i style="text-align: end ; padding: 1px; font-size: 7px">  CS FORM 212 (Revised 2017), Page 1 of 4</i> -->
    </body>
    <!-- PAGE 2 -->

    <body class="printable-page">
      <div class="content">
        <table class="text-center">
          <thead>
            <tr>
              <th colspan="6" style="text-align: left; font-style: italic" class="header-title">
                IV. CIVIL SERVICE ELIGIBILITY
              </th>
            </tr>
            <tr colspan="6">
              <th width="30%" rowspan="2">
                27. CAREER SERVICE/ RA 1080 (BOARD/ BAR) UNDER SPECIAL LAWS/ CES/
                CSEE BARANGAY ELIGIBILITY / DRIVER'S LICENSE
              </th>
              <th width="10%" rowspan="2">RATING (If Applicable)</th>
              <th width="10%" rowspan="2">DATE OF EXAMINATION / CONFERMENT</th>
              <th width="30%" rowspan="2">PLACE OF EXAMINATION / CONFERMENT</th>
              <th width="20%" colspan="2">LICENSE (if applicable)</th>
            </tr>

            <tr colspan="6">
              <th width="10%">NUMBER</th>
              <th width="10%">Date of Validity</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="row in 23" :key="row">
              <td>Eligibility name </td>
              <td>rating </td>
              <td>date_taken</td>
              <td>place </td>
              <td>license_no </td>
              <td>validity </td>
            </tr>
            <tr>
              <td colspan="6" class="note">
                ( Continue on separate sheet if necessary )
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th colspan="8" style="text-align: left; font-style: italic" class="header-title">
                V. WORK EXPERIENCE <br />
                (Include private employment. Start from your recent work)
                Description of duties should be indicated in the attached Work
                Experience sheet.
              </th>
            </tr>
            <tr colspan="7">
              <th colspan="2" width="20%">INCLUSIVE DATES (mm/dd/yyyy)</th>

              <th width="20%" rowspan="2">
                POSITION TITLE (Write in full/Do not abbreviate)
              </th>
              <th width="20%" rowspan="2">
                DEPARTMENT / AGENCY / OFFICE / COMPANY (Write in full/Do not
                abbreviate)
              </th>
              <th width="10%" rowspan="2">MONTHLY SALARY</th>
              <th width="10%" rowspan="2" style="font-size: 8px">
                SALARY/ JOB/ PAY GRADE (if applicable)& STEP (Format "00-0")/
                INCREMENT
              </th>
              <th width="10%" rowspan="2">STATUS OF APPOINTMENT</th>
              <th width="10%" rowspan="2">GOV'T SERVICE (Y/ N)</th>
            </tr>
            <tr colspan="7">
              <th width="10%">From</th>
              <th width="10%">To</th>
            </tr>
          </thead>
          <tbody class="text-center">
            <tr v-for="row in 16" :key="row">
              <td>from</td>
              <td>to</td>
              <td>position</td>
              <td>employer.name</td>
              <td>salary</td>
              <td>salary_grade</td>
              <td>status</td>
              <td>Yes</td>
            </tr>
            <tr>
              <td colspan="8" class="note">
                ( Continue on separate sheet if necessary )
              </td>
            </tr>
            <tr>
              <td width="20%" colspan="2">SIGNATURE</td>
              <td width="40%" colspan="2"></td>
              <td width="10%">DATE</td>
              <td width="40%" colspan="4"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </body>
    <!-- PAGE 3 -->

    <body class="printable-page">
      <div class="content">
        <table>
          <thead>
            <tr>
              <th colspan="6" style="text-align: left; font-style: italic" class="header-title">
                VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT /
                PEOPLE / VOLUNTARY ORGANIZATION/S
              </th>
            </tr>
            <tr colspan="4">
              <th width="35%" rowspan="2">
                29. NAME & ADDRESS OF ORGANIZATION <br />
                (Write in full)
              </th>
              <th width="20%" colspan="2">
                INCLUSIVE DATES <br />
                (mm/dd/yyyy)
              </th>
              <th width="10%" rowspan="2">NUMBER OF HOURS</th>
              <th width="35%" rowspan="2">POSITION / NATURE OF WORK</th>
            </tr>

            <tr colspan="4">
              <th width="10%">From</th>
              <th width="10%">To</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td v-for="cell in 5" :key="cell">&nbsp;</td>
            </tr>
            <tr>
              <td colspan="6" class="note">
                ( Continue on separate sheet if necessary )
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr class="grey white--text">
              <th colspan="6" style="text-align: left; font-style: italic" class="header-title">
                VII. LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING
                PROGRAMS ATTENDED
              </th>
            </tr>
            <tr colspan="5">
              <th width="35%" rowspan="2">
                30. TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING
                PROGRAMS <br />
                (Write in full)
              </th>
              <th width="20%" colspan="2">
                INCLUSIVE DATES <br />
                OF ATTENDANCE <br />
                (mm/dd/yyyy)
              </th>
              <th width="10%" rowspan="2">NUMBER OF HOURS</th>
              <th width="10%" rowspan="2">
                Type of LD <br />
                ( Managerial/ Supervisory/ <br />
                Technical/etc)
              </th>
              <th width="25%" rowspan="2">
                CONDUCTED/ SPONSORED BY <br />
                (Write in full)
              </th>
            </tr>

            <tr colspan="4">
              <th width="10%">From</th>
              <th width="10%">To</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in 21" :key="row">
              <td v-for="cell in 6" :key="cell">&nbsp;</td>
            </tr>
            <tr>
              <td colspan="6" class="note">
                ( Continue on separate sheet if necessary )
              </td>
            </tr>
          </tbody>
        </table>
        <table>
          <thead>
            <tr>
              <th colspan="3" style="text-align: left; font-style: italic" class="header-title">
                VIII. OTHER INFORMATION
              </th>
            </tr>
            <tr>
              <th width="20%">31. SPECIAL SKILLS and HOBBIES</th>
              <th width="40%">
                32. NON-ACADEMIC DISTINCTIONS / RECOGNITION <br />
                (Write in full)
              </th>
              <th width="20%">
                33. MEMBERSHIP IN <br />
                ASSOCIATION/ORGANIZATION <br />
                (Write in full)
              </th>
            </tr>
            <tr v-for="row in 7" :key="row" colspan="3">
              <td v-for="cell in 3" :key="cell">&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colspan="3" class="note">
                ( Continue on separate sheet if necessary )
              </td>
            </tr>

          </tbody>
        </table>
        <table>
          <tr>
            <td class="text-center font-italic" width="25%">
              SIGNATURE
            </td>
            <td width="35%">
              &nbsp;
            </td>
            <td class="text-center font-italic" width="15%">
              DATE
            </td>
            <td>
              &nbsp;
            </td>

          </tr>
        </table>
      </div>
    </body>
    <br />
    <!-- Page 4 -->


    <body class="printable-page">
      <div class="content">
        <table>
          <tbody>
            <tr>
              <td width="70%">
                34. Are you related by consanguinity or affinity to the
                appointing or recommending authority, or to the <br />
                &nbsp; &nbsp;&nbsp;&nbsp;chief of bureau or office or to the
                person who has immediate supervision over you in the Office,
                <br />
                &nbsp; &nbsp;&nbsp;&nbsp; Bureau or Department where you will be
                apppointed,<br />
                &nbsp; &nbsp;&nbsp;&nbsp; a. within the third degree?
                <v-sheet height="2vh">&nbsp;</v-sheet>
                &nbsp; &nbsp;&nbsp;&nbsp; b. within the fourth degree (for Local
                Government Unit - Career Employees)? <br />
                <v-sheet height="5vh">&nbsp;</v-sheet>
              </td>
              <td width="30%">

                <div style="display: flex">
                  <div style="width: 30%">
                    <input type="checkbox" id="single">
                    <label for="single">YES</label>
                  </div>
                  <div style="width: 30%">
                    <input type="checkbox" id="married">
                    <label for="married">NO</label>
                  </div>

                </div>
                <div style="display: flex">
                  <div style="width: 30%">
                    <input type="checkbox" id="widowed">
                    <label for="widowed">YES</label>
                  </div>
                  <div style="width: 30%">
                    <input type="checkbox" id="separated">
                    <label for="separated">NO</label>
                  </div>

                </div>

                <div style="width: 100%">If YES, provide details:</div>
                <div style="width: 100%"><input type="text"
                    style="border-bottom: 1px solid rgba(0, 0, 0, 0.38); padding: 4px;"></div>
              </td>
            </tr>

            <tr>
              <td rowspan="2">
                35. a. Have you ever been found guilty of any administrative
                offense?

                <v-sheet height="5vh">&nbsp;</v-sheet>
                &nbsp; &nbsp;&nbsp;&nbsp; b. Have you been criminally charged
                before any court?

                <v-sheet height="5vh">&nbsp;</v-sheet>
              </td>
              <td>

                <div style="display: flex">
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>YES</label>
                  </div>
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>NO</label>
                  </div>
                </div>
                <div style="width: 100%">If YES, provide details:</div>
                <div style="width: 100%"><input type="text"
                    style="border-bottom: 1px solid rgba(0, 0, 0, 0.38); padding: 4px;"></div>

              </td>
            </tr>

            <tr>
              <td>
                <div style="display: flex">
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>YES</label>
                  </div>
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>NO</label>
                  </div>
                </div>
                <div style="width: 100%">If YES, provide details:</div>
                <div style="width: 100%"> Date Filled :<input type="text"
                    style="border-bottom: 1px solid rgba(0, 0, 0, 0.38); padding: 4px;"></div>
                <div style="width: 100%"> Status of Case/s :<input type="text"
                    style="border-bottom: 1px solid rgba(0, 0, 0, 0.38); padding: 4px;"></div>

              </td>
            </tr>

            <tr>
              <td>
                36. Have you ever been convicted of any crime or violation of
                any law, decree, ordinance or regulation <br />
                &nbsp; &nbsp;&nbsp;&nbsp; any court or tribunal?
                <v-sheet height="5vh">&nbsp;</v-sheet>
              </td>
              <td>

                <div style="display: flex">
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>YES</label>
                  </div>
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>NO</label>
                  </div>
                </div>
                <div style="width: 100%">If YES, provide details:</div>
                <div style="width: 100%"><input type="text"
                    style="border-bottom: 1px solid rgba(0, 0, 0, 0.38); padding: 4px;"></div>

              </td>
            </tr>

            <tr>
              <td>
                37. Have you ever been separated from the service in any of the
                following modes: resignation, <br />
                &nbsp; &nbsp;&nbsp;&nbsp; retirement, dropped from the rolls,
                dismissal, termination, end of term, finished contract or phased
                <br />

                &nbsp; &nbsp;&nbsp;&nbsp; out (abolition) in the public or
                private sector?
              </td>
              <td>

                <div style="display: flex">
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>YES</label>
                  </div>
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>NO</label>
                  </div>
                </div>
                <div style="width: 100%">If YES, provide details:</div>
                <div style="width: 100%"><input type="text"
                    style="border-bottom: 1px solid rgba(0, 0, 0, 0.38); padding: 4px;"></div>

              </td>
            </tr>

            <tr>
              <td>
                38. a. Have you ever been a candidate in a national or local
                election held within the last year (except <br />
                &nbsp; &nbsp;&nbsp;&nbsp; Barangay election)?
                <v-sheet height="3vh">&nbsp;</v-sheet>
                b. Have you resigned from the government service during the
                three (3)-month period before the last <br />
                &nbsp; &nbsp;&nbsp;&nbsp; election to promote/actively campaign
                for a national or local candidate?
              </td>
              <td>

                <div style="display: flex">
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>YES</label>
                  </div>
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>NO</label>
                  </div>
                </div>
                <div style="width: 100%">If YES, provide details:</div>
                <div style="width: 100%"><input type="text"
                    style="border-bottom: 1px solid rgba(0, 0, 0, 0.38); padding: 4px;"></div>
                <div style="display: flex">
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>YES</label>
                  </div>
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>NO</label>
                  </div>
                </div>
                <div style="width: 100%">If YES, provide details:</div>
                <div style="width: 100%"><input type="text"
                    style="border-bottom: 1px solid rgba(0, 0, 0, 0.38); padding: 4px;"></div>
              </td>
            </tr>

            <tr>
              <td>
                39. Have you acquired the status of an immigrant or permanent
                resident of another country?
                <v-sheet height="5vh">&nbsp;</v-sheet>
              </td>
              <td>
                <div style="display: flex">
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>YES</label>
                  </div>
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>NO</label>
                  </div>
                </div>
                <div style="width: 100%">If YES, provide details (country):</div>
                <div style="width: 100%"><input type="text"
                    style="border-bottom: 1px solid rgba(0, 0, 0, 0.38); padding: 4px;"></div>
              </td>
            </tr>

            <tr>
              <td>
                40. Pursuant to: (a) Indigenous People's Act (RA 8371); (b)
                Magna Carta for Disabled Persons (RA <br />
                &nbsp; &nbsp;&nbsp;&nbsp; 7277); and (c) Solo Parents Welfare
                Act of 2000 (RA 8972), please answer the following items: <br />

                &nbsp; &nbsp;&nbsp;&nbsp; a. Are you a member of any indigenous
                group?
                <v-sheet height="3vh">&nbsp;</v-sheet>
                &nbsp; &nbsp;&nbsp;&nbsp; b. Are you a person with disability?
                <v-sheet height="3vh">&nbsp;</v-sheet>
                &nbsp; &nbsp;&nbsp;&nbsp; c.Are you a solo parent?
                <v-sheet height="3vh">&nbsp;</v-sheet>
              </td>
              <td>
                <div style="display: flex">
                  <!-- first -->
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>YES</label>
                  </div>
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>NO</label>
                  </div>
                </div>
                <div style="display: flex">
                  <div style="width: auto">If YES, please specify:</div>
                  <div style="width: 60px"><input type="text" style="border-bottom: 1px solid rgba(0, 0, 0, 0.38); ">
                  </div>
                </div>
                <div style="display: flex">
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>YES</label>
                  </div>
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>NO</label>
                  </div>
                </div>
                <div style="display: flex">
                  <div style="width: auto">If YES, please specify ID No:</div>
                  <div style="width: 60px"><input type="text" style="border-bottom: 1px solid rgba(0, 0, 0, 0.38); ">
                  </div>
                </div>
                <!-- third -->
                <div style="display: flex">
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>YES</label>
                  </div>
                  <div style="width: 30%">
                    <input type="checkbox">
                    <label>NO</label>
                  </div>
                </div>
                <div style="display: flex">
                  <div style="width: auto">If YES, please specify ID No:</div>
                  <div style="width: 60px"><input type="text" style="border-bottom: 1px solid rgba(0, 0, 0, 0.38); ">
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <div style="display: flex">
          <div style="width:80% ; border: 1px solid black">
            <table>
              <thead>
                <th colspan="3" style="text-align: start"> 41. REFERENCES
                  <span style=" color: red">(Person not related by consanguinity or affinity to applicant
                    /appointee)</span>
                </th>

              </thead>
              <thead>
                <th style="width: 30%">NAME</th>
                <th style="width: 30%">ADDRESS</th>
                <th style="width: 10%">TEL. NO.</th>
              </thead>

              <tbody>
                <tr v-for="row in 3" :key="row">
                  <td v-for="cell in 3" :key="cell">&nbsp;</td>

                </tr>
                <tr>
                  <td colspan="3">
                    42. I declare under oath that I have personally accomplished
                    this Personal Data Sheet which is a true, correct and complete
                    statement pursuant to the provisions of pertinent laws, rules
                    and regulations of the Republic of the Philippines. I authorize
                    the agency head/authorized representative to verify/validate the
                    contents stated herein. I agree that any misrepresentation made
                    in this document and its attachments shall cause the filing of
                    administrative/criminal case/s against me.
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
          <div style="width:20%; margin: 0 auto;">
            <center> <v-sheet style="border: 2px black solid; font-size: 8px ; line-height: .98" class="ma-5 pa-2"
                height="auto" width="100px">
                <center class="py-3">ID picture taken within <br />the last 6 months<br /> 4.5 cm x 3.5cm<br />(passport
                  size)</center>
                <center>Computer generated <br />or photocopied picture<br /> is not acceptable</center>
              </v-sheet></center>
            <center style="font-size: 8px; color:grey">PHOTO</center>

          </div>
        </div>
        <div style="display: flex">
          <div style="width:40% "> <v-sheet
              style="border: 2px black solid; font-size: 8px ; line-height: normal; margin: 4px" height="auto">
              <div style="border-bottom: 1px black solid; padding: 4px"><b>Government Issued ID </b> (i.e. Passport, GSIS,
                SSS, PRC, Driver's License, etc.) <br />
                <i>PLEASE INDICATE ID Number and Date Issuance</i>
              </div>
              <div style="border-bottom: 1px black solid; padding: 4px">Government Issued ID:</div>
              <div style=" border-bottom: 1px black solid; padding: 4px">ID/License/Passport No: </div>
              <div style="padding: 4px">Date/Place of Issuance: </div>




            </v-sheet>
          </div>
          <div style="width:40% ">

            <v-sheet style="border: 2px black solid; font-size: 8px ; line-height: .98; margin: 4px" height="auto">
              <div style="border-bottom: 1px black solid; padding: 28px"> </div>
              <center style="border-bottom: 1px black solid; padding: 1px;background-color: #f0f0f0">Signature (Sign
                inside the box)</center>
              <div style=" border-bottom: 1px black solid; padding: 2px"></div>
              <center style="padding: 1px; background-color: #f0f0f0">Date Accomplished</center>


            </v-sheet>
          </div>
          <div style="width:20% ">

            <v-sheet
              style="border: 2px black solid; font-size: 8px ; line-height: .98; margin-top: -2mm; margin-left: 5px;  margin-right: 5px">

              <center style=" padding: 1px; background-color: #f0f0f0; border-top: 1px black solid; margin-top: 22mm">
                Right Thumbmark</center>

            </v-sheet>
          </div>
        </div>
        <div style="border-top: 2px solid black; margin-top:2px">
          <center style="font-size: 11px; margin-top: 2mm; margin-bottom: 2mm">
            SUBSCRIBED AND SWORN to before me this <input type="text"
              style="border-bottom: 1px solid rgba(0, 0, 0, 0.38); padding: 3px; " /> , affiant exhibiting his/her validly
            issued government ID as indicated above.
          </center>
          <center>
            <v-sheet style="border: 2px black solid; font-size: 8px ; line-height: .98; width: 40%">

              <center style="padding: 1px; background-color: #f0f0f0; border-top: 1px black solid; margin-top: 20mm">
                Person Administering Oath</center>

            </v-sheet>
          </center>
        </div>

      </div>
    </body>
  </div>
</template>

<script lang="ts" setup>


</script>


<style scoped>
.printable-page {
  width: 210mm;
  height: 297mm;
  margin: 0 auto;
  border: 2px solid black;
  margin-top: 10px;

}

.pds-title {
  font-weight: bold;
  line-height: normal;
  font-style: italic;
  font-size: 9px;
}

.header-title {
  background-color: rgb(155, 152, 152);
  color: white;

}

.note {
  font-style: italic;
  text-align: center;
  color: red
}

table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
  border: 1px solid black;
}

td,
th {
  border: 1px solid black;
  padding: 6px;
  font-size: 9px;
  line-height: 0.98;
  word-break: break-word;
  font-weight: normal;
}

.row-value {
  display: block;
  font-size: 8px;
  margin-bottom: 5px;
  padding-right: 3px;
}

@media print {
  body {
    margin: 0;
    /* Reset margin for printing */
  }
}

table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;

}


.centered-table {
  text-align: center;
}


/* @media print {
div[size="A4"] {
  width: 210mm;
  height: 297mm;
   margin: 0;
    padding: 0;
}
    body {
   width: 210mm;
   height: 297mm;
      margin: 0;
      padding: 0;
    } 
  } */
</style>