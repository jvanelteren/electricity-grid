<!-- Source: https://tennet-drupal.s3.eu-central-1.amazonaws.com/default/2026-04/Handboek%20FCR%20voor%20BSPs%20-%20EN_20260408%20%281%29.pdf
     Retrieved: 2026-06-21 (PDF, text extracted) -->

# handboek-fcr-voor-bsps-en-20260408-1

Source PDF: https://tennet-drupal.s3.eu-central-1.amazonaws.com/default/2026-04/Handboek%20FCR%20voor%20BSPs%20-%20EN_20260408%20%281%29.pdf
Local copy: files/Handboek FCR voor BSPs - EN_20260408 (1).pdf

---

FCR Manual for BSPs 
 
Requirements and procedures for supply of FCR 
 
 
 
C1 – Public Information 
 
 
 
 
 

2 
 
C1 – Public Information 
Foreword and guide 
The frequency within the synchronous area of continental Europe has a nominal set point of 50 Hz. 
Deviations in frequency in respect of this set point are normal and are part of standard operation. The 
purpose of Frequency Containment Reserves (FCR) is to limit and stabilize frequency deviations in the entire 
synchronously connected high-voltage grid (both national and international), regardless of the event and 
location of the imbalance that caused them. Without adequate intervention, frequency deviations may lead to 
automatic load shedding and even cause a black-out in the worst-case scenario. 
The minimum level of FCR contributions required from each control area is agreed annually within the 
European Network of Transmission System Operators for Electricity (ENTSO-E) of the Regional Group 
Continental Europe. The individual values are determined in proportion to the total electricity production in 
the control area of each connected TSO. 
 
A lot of information and requirements are based on European directives and Dutch grid code. Also, 
legislation is described in ENTSO-E’s SAFA1 Annex 1: Policy on Load-Frequency Control and Reserves.  
 
This document is built up by different chapters whose sequence follows the FCR process as closely as 
possible. A description of FCR supply with various compositions of units can be found in chapter 2. This is 
followed by the product specifications for FCR and the information that must be exchanged with TenneT in 
chapters 3 and 4. Chapter 5 sets out the prequalification process together with the corresponding description 
of the prequalification tests in chapter 6. Finally, requirements and information regarding the auction are 
described in chapter 7. 
 
 
 
  
 
1 Synchronous Area Operational Agreement for the Synchronous Area CE 


3 
 
C1 – Public Information 
Table of Contents 
FOREWORD AND GUIDE 2 
VERSION HISTORY 4 
1. DEFINITIONS AND ABBREVIATIONS 5 
2. FCR-PROVIDING UNITS 6 
2.1 MODELLED UNIT/GROUP CONFIGURATION 6 
3. PRODUCT SPECIFICATIONS AND REQUIREMENTS FOR FCR 7 
3.1 PRODUCT-SPECIFIC REQUIREMENTS 7 
3.2 REQUIREMENTS FOR RPU/RPGS WITH LIMITED ENERGY RESERVOIRS (LER) 9 
3.3 CENTRAL CONTROL 13 
4. PROCESS INFORMATION EXCHANGE FOR FCR 13 
4.1 BASIC PRINCIPLES 13 
4.2 POWER METER 14 
4.3 BASELINE 14 
4.4 MEASUREMENT AND BASELINE DATA AGGREGATION 15 
4.5 MEASUREMENT AND BASELINE DATA STORAGE 15 
4.6 DATA EXCHANGE OF MEASUREMENT AND BASELINE DATA 15 
4.7 VERIFICATION OF DELIVERY AND REQUIRED QUALITY 16 
4.8 DATA EXCHANGE OF ALLOCATION MESSAGES 18 
5. PREQUALIFICATION 20 
5.1 PREQUALIFICATION PROCEDURE 20 
5.2 VOLUME TO BE PREQUALIFIED 21 
5.3 SPECIAL RPG (SRPG) 22 
5.4 REPETITION OF PREQUALIFICATION 23 
5.5 FLOWCHART SHOWING PREQUALIFICATION TYPES 23 
6. PREQUALIFICATION TESTS 24 
6.1 TEST PROTOCOL 24 
7. AUCTION SCHEME 29 
7.1 GENERAL 29 
7.2 DEFINITIONS 30 
7.3 BIDS 30 
7.4 AWARDING 32 
7.5 FALLBACK PROCEDURE IN THE EVENT OF AN AUCTION SHORTFALL 33 
8. APPENDICES 33 
8.1 APPENDIX NORMAL VERSUS RESERVE MODE 33 
8.2 APPENDIX UPDATE ALLOCATION NOTICE AND PENALTIES 36 

4 
 
C1 – Public Information 
Version history  
To clarify what has been amended in each chapter, the version management table has been designed to 
describe these changes in each chapter. 
Version Date 
V 1.0  
 
10/06/2018 Initial version  
  
V1.1  15/11/2018 Whole document Textual changes 
  
V1.2 15/03/2019 Chapter 5. Prequalification 
Chapter 6. Prequalification tests 
  
V1.3 
 
01/07/2019 
 
Entire document Textual adjustments 
Chapter 7 Auction: Implementation of marginal pricing and d-2 auctions 
  
V1.4 20-08-
2019 
Chapter 5 Some textual changes for clarification 
  
V1.5 
 
 
19-11-
2019 
 
Entire document Textual adjustments 
Chapter 6 Change on overshoot 
  
V2.0 Juli 2020 Entire document Adjustments in relation to daily auctions with 4-hour blocks 
  
V2.1 
 
Aug 2020 §7.4.4 Adjustment on communication: Mail instead of telephone 
  
V2.2 Oct 2020 § 4.1.1.3 Time shift from 06h00 to 09h00 
§ 4.1.1 Elaboration on use of allocation message 
§ 4.1.1.1 and 
§4.1.1.4 
Adding Private Network 
  
V2.3 Dec 2020 Entire document Correction on chapter numbers and cross references 
§ 4.2.2 Added notes on testing allocation message 
§ 6.1.5 Change in test duration of test 'i ' from 8 to 4 hours 
  
V3.0 March 
2021 
Several paragraphs Change and additional requirements on FCR based on decision of ACM case 
number ACM/18/033952 
  
V3.1 
 
June 2021 § 6.1.5 Several references corrected 
  
 
V3.2 
 
 
Dec 2021 
Entire document Several Adjustments 
§ 3.2.1 a 3.2.4  Adding reserve mode  
  
V3.3 March 
2022 
Chapter 6 New test scenarios 
  
V3.4 Sept 2022 § 5.2 and 5.5 Minimum threshold power RPU / RPG 
  
V3.5 April 2023 § 4.1.1.4 Mobile network replaced by fixed connection 
    
V3.6 Jan 2024  § 4.2 
§ 7.5 
Handling allocation message 
Addition of description second auction in case of shortfall in relation to not enough 
bids 
  
V3.7 Febr 2024 § 4.2.1 Addition/clarification of administrative penalty 
    
V3.8 March 
2025 
H3 and H4 Update on readability no content changes 
§ 3.1.2 Clarification on starting time frequency measurement versus start of contract period 
§ 5.4 Refining duration of re prequalification period after losing recognition. 
§ 3.2.2 Addition/clarification on 15 min delivery LER/Battery 
    
V3.9 Oct 2025 Entire document Improving readability 
  Entire document Addition of baseline 
  Chapter 4 Allocation message through MMC-hub 
    
V3.10 Apr 2026 § 4.7 New section: Verification of Delivery and required quality 
  § 3.2.1 Update of LER definition 

5 
 
C1 – Public Information 
1. Definitions and Abbreviations 
Definition/abbreviation Description 
BSP In EB-GL:  
‘Balancing Service Provider’ means a market participant with 
reserve-providing units or reserve-providing groups able to provide 
balancing services to TSOs 
CPS Central Postbox System 
MMC-hub Market to Market Communication Hub, data exchange using 
asynchronous webservice calls 
DSO Distributed System Operator 
EMS Energy Management System 
FCR Frequency Containment Reserve; FCR  
Centralised Frequency 
Measurement or Centralised FCR 
Controller 
Principle of using a single frequency measurement for activation of 
a number of decentrally located technical entities forming a FCR 
providing unit or providing group. The application of this principle 
requires the respective transmission of the frequency signal to the 
individual FCR providing unit or FCR providing group 
Decentralised Frequency 
Measurement 
Principle of using independent on-site frequency measurements at 
the connection points or below at site of generating units of the 
technical entities forming FCR providing units or FCR providing 
groups and activation of FCR based on this on-site measurement 
ITP Information Transfer Point 
RPU Reserve Providing Unit 
RPG Reserve Providing Group 
Special RPG (SRPG) Is an RPG consisting of a TI of <1.5 MW whereby the data 
exchange takes place by means of one (1) aggregated signal. 
RTU Remote Terminal Unit 
EB-GL Electricity Balancing - Guide Line, Regulation (EU) 2017/2195 
SO-GL System Operation Guide Line; Regulation (EU) 2017/1485 
TI Technical Installation: single power generating module or demand 
unit 
TSO Transmission System Operator 
 
  

6 
 
C1 – Public Information 
2. FCR-providing units  
This chapter sets out how units/unit groups that intend to provide FCR can be defined and modelled.  
2.1 Modelled unit/group configuration 
In line with the System Operation Guide Line (SO-GL), TenneT recognises the terms Reserve Providing Unit 
(RPU) and Reserve Providing Group (RPG). A brief explanation of this is given below. 
 
SO-GL Article 3 definitions, paragraphs 2.10 and 2.11  
2.10 ‘reserve providing unit’: single electricity-generating unit or combined group of electricity-generating 
units and/or consumer units linked to a common connection point which provide/provides the required supply 
of FCR, FRR or RR;  
 
2.11 ‘reserve providing group: a group of electricity-generating units, consumer units and/or reserve-
providing units linked to multiple connection points which provide/provides the required supply of FCR, FRR 
of RR; 
 
 
 
Figure 1: Example of RPU and RPG 
The Technical Installations (TIs) behind a single grid connection that collectively meet all requirements of an 
RPU, in accordance with SO-GL Article 3 definitions, paragraph 2.10 is shown in Figure 1, left. RPUs can 
also be grouped together in an RPG (Figure 1, right). A group may consist of one (1) or more RPUs. 
 


7 
 
C1 – Public Information 
 
Figure 2: Example of a special Reserve Providing Group, with TIs = Technical Installations 
In Figure 2, a special RPG is displayed, which is a defined collection of TIs where although not each 
individual TI is able to meet the requirements for FCR, the whole RPG can do so. This is in accordance with 
SO-GL Article 3 definitions, paragraph 2.11. 
 
3. Product specifications and requirements for FCR  
The prequalification process is made up of different parts, which are described in the next chapters along 
with the prequalification test. After total prequalification, a framework agreement can be concluded. The 
framework agreement can be requested via sending an e-mail to BSP@tennet.eu. If additional power is 
prequalified and a framework agreement has already been concluded, then only the technical prequalification 
needs to be carried out without the need of a new framework agreement. 
Following prequalification and the signing of the framework agreement, the BSP gains access to the auction 
platform (Regelleistung). The requirements for participation in the auction and the bids are set out in chapter 
7 (Auction) of this manual.  
3.1 Product-specific requirements  
Specifications derived from the European Codes (in particular the SO-GL and RfG ) and the Dutch Grid 
Code, state specifications that the FCR product and all FCR RPU and RPGs must meet: 
3.1.1 Frequency activation specifications 
1. Activation of FCR is not artificially delayed and begins as soon as possible but no later than 2 seconds 
after a frequency deviation; and rises at least linearly. When one of the requirements cannot be met, the 
FCR providing group or FCR providing unit shall provide technical evidence to TenneT. TenneT 
assesses these justifications and decides whether or not the unit or group can be qualified to provide 
FCR; 
2. Activation speed of 30 seconds for the full allocated volume; 
3. Frequency deviation for full FCR activation is + 200 mHz / - 200 mHz; 
4. An RPU/RPG must supply FCR for as long as the frequency deviation persists within contracted period; 
5. During activation delivery should be minimal linear with the frequency deviation.  
 


8 
 
C1 – Public Information 
 
Figure 3: Activation when contracted power = 20 MW 
3.1.2 Frequency measurement specifications  
1. Minimum accuracy of the frequency measurement is 10 mHz or industry standard, whichever is 
better; 
2. Maximum Insensitivity range of the FCR control is 10 mHz; 
3. The registration of the frequency measurement starts at least 5 minutes before stat of the awarded 
contract period. 
3.1.3 Delivery during large frequency deviations 
1. FCR providing units and FCR providing groups continue to provide FCR and are not allowed to 
reduce activation in case of a frequency deviation outside the frequency range of +/- 200 mHz up to 
the frequency ranges 47,5 to 51,5 Hz; 
2. Each FCR providing unit or group shall be capable of activating FCR within the frequency range of 
47,5 to 51,5 Hz and for time periods of 30 minutes.
2 
3.1.4 Specifications when a (unlimited) production unit is not contracted (not 
awarded/allocated on) 
1. If an existing production unit has not been contracted for FCR, the unit in question must maintain a 
dead band of 500 mHz and a droop of 8% according to Grid code art 14.5 sub 9. What the code 
wants to achieve is that all units that can still contribute do so in this very exceptional situation, so 
that load shedding (which starts at 800 mHz) or worse can be avoided. 
2. For new units
3 the following is applicable according to grid code article 9.27:  
a. Connected entities which have an electricity production unit of type C or D, to which, in 
accordance with Article 4, first paragraph, of Regulation (EU) 2016/631 (NC RfG) is 
applicable shall ensure that the provision of frequency response for the active power as 
referred to in Article 3.24(2) is activated at a frequency threshold of 49.8 Hz and at a droop 
of 5%. 
 
2 Source: RfG-GL article 13 and SO-GL154 sub 6 (Requirement is not applicable to existing units, also see previous note) 
3 Definition of new is stated in RfG-GL article 4 


9 
 
C1 – Public Information 
b. Connected entities that have an electricity production unit of type A, B, C or D will have the 
type A, B, C or D, on which the frequency threshold is activated in accordance with Article 4, 
first paragraph, of Regulation (EU) 2016/631 (NC RfG) is applicable shall ensure that the 
provision of frequency response for the active power as referred to in Article 3.13(4) is 
activated at a frequency threshold value of 50.2 Hz and with a 5% droop. 
 
3.2 Requirements for RPU/RPGs with Limited Energy Reservoirs (LER) 
The requirements for supplying the FCR for both limited and unlimited sources are the same apart from some 
exceptions. For RPUs/RPGs that have an energy limited TI – i.e. batteries - specific additional requirements 
apply (based on the SO-GL). These are explained below.  
3.2.1 LER specific definitions 
Active Energy Reservoir Management Active charging/discharging of the reservoir depending on the 
state of charge which results from FCR activation to avoid a 
status of a completely full/empty reservoir 
Effective Energy Reservoir The energy reservoir of a storage device which can effectively 
be used for energy feed/absorption 
LER FCR Providing RPU/RPG FCR supplying RPUs/RPGs are considered LER for FCR if in 
operation a situation can occur that a full continuous activation 
for a period of two hours in positive or negative direction, leads 
to a limitation of the delivered power for a full FCR activation. 
This does not take into account the effect of an active load 
management. This determination is done based on the 
Effective Energy Reservoir available for FCR delivery. 
Normal mode  
 
Activation of FCR depending on system frequency deviation 
Reserve mode Activation of active power response depending on short term 
frequency deviation from the mean frequency deviation 
Table 1, LER specific definitions 
3.2.2  15-minute requirement for energy limited sources 
RPUs/RPGs that have an energy-limited TI must be in a position to provide constant support to the 
frequency within the standard frequency range. 
If, in the event of a larger frequency deviation, the "alert state"4 is reached, an installation must be able to 
continuously supply the full quantity of FCR awarded/contracted for a period of not less than 15 minutes in 
the event of a deviation of 200 mHz or more, or to supply partial delivery for a proportionately longer period in 
the event of frequency deviations lower than 200 mHz. Effectively, the supply must take place as soon as the 
deviation occurs and for at least 15 minutes after the alert state has been reached. 
After these 15 minutes (or a proportionately longer period), a limited installation must have the 
awarded/contracted amount of FCR fully available again as soon as possible, but no later than two (2) hours 
after reaching the standard frequency range. 
 
4 In relation to Alert state frequency deviation: |Δf| ≥50 mHz for 15 minutes, |Δf| ≥100 mHz for 5 minutes or instantaneous |Δf| ≥200 mHz  

10 
 
C1 – Public Information 
For the sake of completeness, it should be noted that unlimited sources such as large gas or coal-fired 
production units must be able to deliver for an unlimited period of time. 
It should be noted that ‘not less than 15 minutes’ or ‘at least 15 minutes’ means that after 15 minutes the 
LER will continue to deliver as long as the frequency deviation persists and is technically possible (see also 
the requirement in 3.1.1 bullet 4). For batteries, as soon as the SoC reaches specific limits and there is still 
an alert, the battery must switch from normal mode (response to the actual frequency deviation) to a reserve 
mode (response to an average frequency deviation). (See 3.2.5 and appendix 8.1). 
3.2.3 Determination of the Alert state 
1. Frequency deviation > 50 mHz for 15 min; 
2. Frequency deviation > 100 mHz for 5 min; 
3. Frequency deviation > 200 mHz instantaneously. 
If the frequency deviation goes 1 second towards 200 mHz, then the system state will be back to normal after 
1 second according to the 3rd of the requirements. If the frequency deviation in that case is still less than 5 
minutes greater than 100 mHz or not more than 15 minutes greater than 50 mHz, the system state will be 
normal. The counter for the 3rd requirement will jump back to 0, but the counter for requirements 1 and 2 will 
not until the frequency deviation is still greater than 50 or 100 mHz respectively. If the frequency deviation 
fluctuates around 50 mHz, the counter will also keep jumping back to 0 and the BSP must use load 
management to ensure that the SoC remains within the limits so that the full allocated power can be supplied 
for at least 15 minutes (FCR supply at a frequency deviation of 200 mHz).  
3.2.4 Combining energy-limited sources and energy-unlimited sources 
Within an RPU/RPG, an FCR-BSP is free to combine energy-limited sources with unlimited installations, in 
which case the 15-minute requirement (3.2.2) will relate to the entire RPU/RPG rather than the individual TIs.  
The energy unlimited TI's within RPUs/RPGs do not limit their FCR supply when technical entities with a 
limited energy reservoir (of that FCR supplying group/unit) are already depleted in positive or negative terms 
as long as the frequency deviation persists. 
 
In case RPG/RPU with combination of limited and unlimited TIs are not considered as LER if their energy 
reservoir has the capacity to supply FCR as long as the frequency deviation continues with a duration of 4 
hours (the contract period). 
3.2.5 Battery 
A battery or a pool of batteries has a number of specific characteristics; these include charging limits, self-
discharge, ageing, unacceptable operating conditions etc. These must be documented and submitted along 
with the other prequalification documents. The requirements for this are set as following. 
 
Load management 
The frequency within the synchronous system of continental Europe averages 50 Hz.  
Periods with average frequency deviations in a single direction will have a continuous effect on the state of 
charge (SoC) of a battery supplying FCR, despite the fact that the frequency remains normal. As such, active 
charging management of the batteries is necessary to enable constant frequency support within the 
“standard frequency range”. With regard to charging management: 

11 
 
C1 – Public Information 
• Load management must be set up in such a way that, when there is a transition from normal to alert 
state, full activation of the contracted FCR lasting 15 minutes is possible or for proportionally longer when 
the deviation is less than 200 mHz; 
• Charging/discharging for load management of the battery may only occur during "normal state"; 
• The battery’s load management may not be based on operational control that causes a frequency 
support ‘overreaction’ whereby more power than necessary is supplied to the grid or drawn to maintain 
the battery level; 
• Load management may not have any impact on the FCR supply; 
• The SoC values on which the load management is triggered, must be selected in such a way that during 
active load management a proper monitoring of the delivery is not negatively influenced; 
• Load management must be described in the prequalification documents. 
 
Charging and discharging capacity 
The charging and/or discharging capacity of the battery is related to the load management and the energy 
content of the battery. No further requirements are set here (although it must be described in the 
prequalification report). 
 
Reserve modus 
For batteries, it is a requirement to have charge management to be able to continuously activate FCR in 
normal condition and to fully activate FCR in alert for the time period of 15 minutes. Supplementary to this 
requirement, LER has an additional requirement called reserve mode.  
 
The reserve mode requirement does not apply to existing LER RPUs with FCR delivery which are 
prequalified for the first time before 01-08-2022 (August 1st, 2022). Not even if they undergo a re-
prequalification after this date. 
 
The requirement for reserve mode comes into effect for LER FCR installations that have registered for pre-
qualification from 01-08-2022. 
 
The requirement for a reserve mode reads as follows: 
 
For LER FCR supplying units (individually or belonging to a LER FCR supplying group) that are prequalified 
for the first time after the methodology comes into force and have technical capability (e.g. inverter 
connected assets), are able to switch from normal mode to reserve mode.  
 
In terms of content, this means that if the frequency triggers an alert state, charge management stops (as is 
already the requirement today) and once the SoC reaches specific limits the battery switches from normal 
mode (response to the actual frequency deviation) to a reserve mode (response to an average frequency 
deviation). 
 
If an (to be) RPU is not technically capable to switch to reserve mode, the BSP must sent in a document 
which arguments why the unit is not capable. TenneT will decide on the documentation if the unit can 
proceed in qualification or not. 

12 
 
C1 – Public Information 
 
The Technical Entity's (TEs, equivalent to TIs) behind one (1) connection that jointly meet all the 
requirements of FCR form an RPU according to SO-GL. The reserve mode applies to LER RPUs. The figure 
below provides more clarification. 
 
 
Figure 4: TIs in a reserve providing unit and reserve providing group 
The reserve mode requirement applies to RPUs (encircled in green in Figure 4) even if they are part of a 
group. 
Exempted from the reserve mode requirement are those TIs that form a RPG 3 with a defined collection of 
TIs behind different connections, where not every individual TI can meet all the requirements for FCR but the 
whole (RPG) can. 
 
A further explanation of the reserve mode is given in annex 8.1. Also, additional information can be found in 
the explanatory note published on the TenneT website. 
 
Energy content 
The energy content of the battery is related to the power and the load management; No further requirements 
are set here.  
 
Prequalified power and rated power  
ENTSO-E’s Policy 1 (Load-Frequency Control and Performance) includes the following: 


13 
 
C1 – Public Information 
Limited sources that are used as independent units for FCR supply have a ratio of rated power to 
prequalified power of at least 1.25:1 or an alternative solution with equivalent effect, for example by active 
load management.  
3.3 Central control 
In the case of a central controller and frequency measurement, the FCR-BSP shall ensure that both the 
control of the TI/RPU and the frequency measurement from the regional 110 kV or 150 kV grid or the 
underlying grid in which the different TI/RPUs are geographically located are used. This will minimise the 
effects of a possible system split or communication disruptions to and from the central controller.  
 
The FCR-BSP will therefore ensure that a geographically autonomous activation of FCR in each grid area is 
possible by setting up a system that detects differences in frequency between regions (of 110 kV and/or 150 
kV-grids) in the event of a system split or disruption in communication. If the RPU/RPGs include TIs with 
local frequency measurements, these may be integrated into the above system to detect differences. 
The grid areas are defined as follows: 
• 110 kV Groningen/Drenthe/Overijssel 
• 150 kV Gelderland/Flevoland 
• 150 kV North Holland 
• 150 kV Zeeland 
• 150 kV Brabant  
• 150 kV Limburg 
• 150 kV South Holland 
• 110 kV Friesland 
• 150 kV Utrecht 
  
FCR BSP will provide documentation on how autonomous activation per network area is ensured and how 
differences in frequency measurements are detected.  
 
4. Process information exchange for FCR  
BSPs must ensure the delivery of the capacity measurements and baseline with regard to RPUs and/or 
RPG, so that TenneT can verify the delivery of FCR. 
4.1 Basic principles 
• The location of the Information Exchange Point (IEP); 
• The physical point where information is transferred between a BSP and TenneT is at TenneT in Arnhem, 
the Netherlands, or in one of TenneT’s high voltage stations; 
• The BSP-FCR is responsible for the data transfer between its own systems and the agreed IEP;  
• TenneT is responsible for the data transfer on the route between the IEP and TenneT’s systems; 
• Each party is responsible for its own share of the costs for the realisation and maintenance of the agreed 
information exchange. The responsibility for costs is demarcated by the IEP; 

14 
 
C1 – Public Information 
• There are three methods of exchanging measurement and baseline data: via a leased line and Remote 
Terminal Unit (RTU), via a web service which uses internet, or via a private fixed connection and a 
Remote Terminal Unit. 
4.2 Power meter 
• Measurement of RPU/RPG in MW, to at least three decimal places with a refresh rate between of 4 
seconds or shorter, if possible one (1) second; 
• Maximum inaccuracy must be demonstrably 1% (of the nominal value, class 0.5s). 
4.3 Baseline 
The RPU baseline signal is the signal what the RPU would have done without FCR-actions.  
If the RPG/RPU is for example also delivering aFRR, that should be included in the baseline. Potential 
charge management should also be included in the baseline.   
 
Requirements that the baseline should comply with: 
1. The baseline is determined by the BSP and sent by the BSP to TenneT; 
2. The unit is MegaWatt [MW], the number of decimals will be aligned with the BSP; 
3. The baseline may be constructed in real-time or ahead of time. The baseline may not be 
constructed/adjusted after the FCR-delivery (ex-post); 
4. The baseline should have the same time resolution as the power measurements; 
5. The baseline should contain the expected response of the same TIs as the (aggregated) 
measurement; 
6. The baseline cannot be influenced by the FCR frequency measurement; 
7. The baseline should always be constructed in the same way, independent of the frequency 
measurement; 
8. The baseline should be sufficiently accurate (comparable with power measurement); 
9. The construction and used input parameters for the baseline are documented by the BSP in the 
prequalification report; 
10. Changes with respect to the baseline from what has been described in the prequalification report, will 
be announced to TenneT for approval.  
 
What is allowed (best practices): 
• Use expected energy program, including planned ramps between ISP transitions; 
• Calculate the “power controller” output by using input values like temperature; 
• Calculation of expected output power based on reference measurements. 
 
What is not allowed: 
• Including units which are not prequalified in the baseline; 
• So-called “mirroring”: this means that the baseline changes in the opposite direction with respect to the 
grid frequency. 

15 
 
C1 – Public Information 
4.4 Measurement and baseline data aggregation 
A BSP has the right to aggregate the measurement data and baseline data of units whose power is lower 
than 1.5 MW, on condition that the maximum power of the combined group of units does not exceed 30 MW 
and the supply of the primary reserve can be verified. 
4.5 Measurement and baseline data storage 
In accordance with the framework agreement, a BSP is required to store the measurements and baseline 
data at TI-level for six (6) months after delivery. 
4.6 Data exchange of measurement and baseline data 
Specific equipment is needed for exchanging measurement and baseline data and there are various ways of 
doing so, namely by means of leased lines or a web service. These are explained below followed by a 
description of the basic principles with regard to the measurement of power. 
4.6.1 Leased line and RTUs 
Detailed specialist consultation will have to take place about the design and implementation of the RTU in 
order to set out the coordination of the systems used and the specifications of the individual signals 
unambiguously.  
 
RTUs with the ‘IEC 870-5-101’ protocol and the ’IEC 870-5-104’ protocol are used for communication with 
TenneT’s Energy Management System (EMS). Given that the ‘IEC 870-5-101’-protocol is finite, there will be 
no new parties connected to it. TenneT has the so-called Protocol Implementation Documents (PID’s) for 
these protocols, which can be requested by BSP@tennet.eu . 
 
To limit the risk of interruptions to the signal transmission due to malfunctions or maintenance, a redundant 
connection - in other words two communication connections - is required. One of these connections acts as a 
backup, with functionality to switch over automatically if the primary connection is interrupted. Both the BSP 
and TenneT must be able to switch from the active connection to the backup connection. 
 
When the ‘IEC 870-5-101’ protocol is applied, the two connections are scanned simultaneously. In that case, 
there is one active and one passive connection. The set points are sent via the active connection. The 
passive connection is scanned by the EMS to check whether the connection is still working correctly. 
When the ‘IEC 870-5-104’ protocol is applied, one connection is called on at the same time. Once a day 
there is a switch to the other connection on the RTU. 
4.6.2 Web service (MMC-hub) 
The measurement and baseline data can also be submitted to TenneT through an FCR web service. The 
measurement data can be sent a number of times a day retrospectively, as far as this is done before D+1 
09:00 h. For more details look at ‘FCR – Implementation Guide’. In this document there are references to 
other more technical documents like wsdl’s and certificates. It can be obtained from MyTenneT.  

16 
 
C1 – Public Information 
4.6.3 Private fixed connection  
When using the private fixed connection, TenneT takes care of the infrastructure up to and including the 
router that is delivered to the BSP. 
  
 
 
Figure 5: Private fixed connection 
The location of the information exchange point (IEP) is the physical point where information is transferred 
between BSP and TenneT and is the router at the BSP. This means the following:  
• The BSP ensures that the router is accessible when needed;  
• The RTU has to be able to communicate with the by TenneT accounted IP-address; 
• The BSP is responsible for the connection between the router and his RTU as described in paragraph 
4.1. More information about the implementation of the private fixed connection can be requested via 
tennetccc@tennet.eu.  
4.7 Verification of Delivery and required quality 
After successful implementation of the baseline, verification of delivery will come into effect and include the 
following: 
• The net FCR-delivery is deemed to be equal to the difference between measurement and baseline; 
• In line with the product specifications, the net FCR-delivery should comply with: 
• a first response to a frequency deviation within 2 seconds; 
• 50% of the required response is present within 15 seconds; 
• 100% of the required response is present within 30 seconds. 
 
Based on the FCR allocation, the observed frequency deviation and the rules above, a so-called corridor is 
derived. This corridor accommodates a tolerance corresponding to +/-10 mHz (which relates to 5% of the 
allocated FCR-volume) which is based upon the allowed deadband / insensitivity. The corridor does not 
include any further tolerances to accommodate for measurement/baseline errors. The net FCR-delivery 
should remain within the corridor.  
 


17 
 
C1 – Public Information 
 
Figure 6: Allowed tolerance around net FCR-delivery 
In addition to the corridor, the relationship between net-FCR delivery and frequency deviation is analysed. In 
this analysis it is verified that the actual power-to-frequency-response complies with the target power-to-
frequency-response. 
 
 
Figure 7: Power-to-frequency-response 
In the verification of delivery at least the following performance indicators are calculated per ISP: 
• Time out of bound (adequate delivery if time out of bound <5%) 
• The time out of bound corresponds to the percentage of time when there is an under delivery.  
• Actual power-to-frequency-response / target power-to-frequency-response [] (adequate delivery if this 
ratio is between 0.9 and 1.30) 
• This performance indicator is defined by the ratio between the slope of the fitted (linear) regression 
line for the actual FCR and the slope of the expected FCR. The ideal value is 1, >1 means over-
delivery of FCR, <1 means under-delivery of FCR. 
 
If TenneT observes an inadequate delivery, TenneT will inform the BSP about the registration. The BSP may 
oppose the registration. If the notice of objection is considered valid, the registration will be withdrawn. In 
case of no response by the BSP, or in case the notice of objection is considered non-valid, a sanction for 
lack-of-response is imposed in accordance with the framework agreement FCR. 


18 
 
C1 – Public Information 
4.8 Data exchange of Allocation messages 
BSPs shall allocate the provision of the planned distribution of awarded FCR bids among RPUs and/or RPGs 
so that TenneT can check the availability and supply of FCR.  
4.8.1 Allocation of FCR among RPUs/RPGs 
The BSP shall allocate the FCR acquired at the auction among its RPUs/RPGs that are prequalified to 
supply it. The BSP must inform TenneT about this allocation by means of an electronic message. 
 
In the case of an RPG, the BSP shall act as an aggregator and is responsible for sending a single electronic 
message detailing the allocation among the RPUs and/or RPGs within the FCR portfolio of the BSP.  
 
If a BSP is not able to cover the (entire) contracted FCR by its own RPUs/RPGs, the part of the obligation 
that cannot be covered may be subcontracted to another BSP. This substitution has to be reported within the 
allocation message. Subcontracting is only allowed if it concerns symmetrical power and in steps of 100 kW 
with a minimum of 100 kW. 
 
The FCR-BSP must always sent in a first version of an allocation message before 17:00 h on day ahead (D-
1). The intention is that TenneT checks during the preparation phase, based on the allocation message, 
whether sufficient FCR has been allocated (compared to the auction results). If insufficient FCR is available, 
TenneT may have to buy additional FCR, which can be expensive and possibly unnecessary if a first version 
is sent in later. No allocation message before 17:00 h will result in a fine (fixed amount € 2500). The fine (€ 
2500) is to create sufficient incentive among BSPs to send in a first version before 17:00 h. 
 
The FCR-BSP should among others transmit the following to TenneT via the allocation message: 
• The RPU/RPG that will be used the next day for the FCR supply; 
• How much FCR per RPU/RPG will be held available; 
• Any transfer of volume to other BSPs; 
• Any non-availability; 
• the message only concerns the implementation day (D). 
It is not allowed to allocate more (nor less) FCR over the RPU/RPGs that the contracted commitment to 
deliver FCR. 
 
If the BSP needs to switch RPU/RPG during the day, the BSP’s central contact point shall inform TenneT of 
this without delay by means of a new allocation message 
Other process rules for drafting the allocation message are: 
• After 17:00 h D-1 a first version can still be sent in; 
• After 17:00 h D-1 the allocation message can be adjusted; 
• The allocation message can also be adjusted for already expired ISPs; 
• Exception is Non-Availability notifications via allocation message. Non-availability must be reported 
immediately. The Time series Non-Availability can only be adjusted up to two (2) ISPs in the past. Non-
Availability must always be reported immediately because TenneT must monitor real time whether 
sufficient FCR is available. Incentive for immediate reporting is that penalty of a Non-Availability is lower 
than the penalty on a lack of response; 

19 
 
C1 – Public Information 
• Deadline for sending in (amended) allocation messages is set at D+1 09:00 h. If, for whatever reason, no 
message is received on D+1 09:00 h by TenneT, the monitoring will determine a 'non-availability' penalty 
for the amount of the volume awarded in the auction next to the administrative penalty of € 2500; 
• If an allocation message is submitted on time, but with incorrect content (e.g. allocation of FCR on an 
incorrect RPU/RPG), an (administrative) penalty of € 2500 will be charged, on top of any established lack 
of response of the actual supplying RPU; 
• In situations not covered by this Handbook, but where the error is of an administrative nature, the 
(administrative) penalty of € 2500 also applies, on top of any established defective response. 
 
If, when sending a new or updating an existing allocation message, a Nack Message is received, the BSP is 
responsible to correct the allocation message according to the rules and specification described in the 
document 'FCR Implementation Guide' to be found on MyTenneT. If a Nack Message is sent by TenneT, any 
allocation message received via e-mail will generally not be accepted.  
4.8.2 CPS of MMC-hub 
Until now the allocation message should be sent to through CPS. We want to replace CPS and channel with 
MMC-hub. During the transition period there are two channels to send the Allocation message: CPS and 
MMC-hub. More information on this can be requested by sending an e-mail to tennetccc@tennet.eu  
 
The message specifications and the communication process are described in the ‘FCR Implementation 
Guide’ document that can be found on MyTenneT.  
 
 
If the BSP is not able to send an allocation message via the normal procedure, due to a connection problem 
or system failure at TenneT, the allocation message can be sent via e-mail to both ProcesspecialistenSON-
SYBalanshandhaving@tennet.eu and tennet-operational-planning@tennet.eu 
 
As a general remark, the FCR delivery should not be jeopardized by the impossibility to send an allocation 
message to TenneT. 
4.8.3 Testing allocation message during prequalification 
It is possible to test the creation of the allocation message and check if it is correctly processed in TenneT 
system.  
 
MMC-hub 
There is a test-environment available for MMC-hub message testing. 
 
CPS 
To do so, the allocation message should be sent via e-mail (not via the CPS-connection) to TenneT. 
 
In order to facilitate this testing, two test scenarios have been defined and are described in the document 
'FCR Allocation Message test scenarios' which can be found on the website of TenneT
4 

20 
 
C1 – Public Information 
When these allocation messages have been correctly processed by the TenneT system, a positive 
acknowledgment will be sent to the BSP.  
 
5. Prequalification  
5.1 Prequalification procedure 
BSPs use the prequalification procedure to prove in advance that they and their RPU/RPGs fulfil the 
requirements relating to the supply of FCR. To that aim, BSPs must submit a prequalification application for 
each TI or group of TIs. 
The prequalification procedure is described in more detail in "Prequalification procedure for FCR, aFRR 
and mFRR". This information can be found on the TenneT website. 
5.1.1 Applying for prequalification process 
The prequalification process starts with filling in an application form. All technical installations that are part 
of the prequalification test should be indicated in this application. In case the TI(s) are connected to the 
connecting DSO grid, a DSO is entitled (during the prequalification procedure, in accordance with SO-GL 
Article 182 paragraphs 4 and 5), in consultation with TenneT, to set limits on the supply of FCR in its 
distribution grid or to exclude the supply of FCR in its distribution grid for technical reasons, such as the 
geographical locations of the RPU or RPGs.  
The application has to be sent one month in advance because TenneT has to align the prequalification test 
with the concerning DSO. 
5.1.2 Prequalification test 
Chapter 6 describes the prequalification tests. The prequalification test shall be carried out by the BSP 
himself and has to be done under the supervision of qualified operators. If TenneT wishes, TenneT has to be 
permitted to be present while the actual tests are being carried out. 
5.1.3 Evaluation of prequalification 
5.1.3.1 Check for completeness 
For the purpose of the prequalification of the BSP and its operational resources, a first check of the 
completeness of the data submitted is done. TenneT will notify the BSP no later than eight weeks after 
receipt, in accordance with SO-GL Article 155, paragraph 4. If the application for prequalification is 
incomplete, TenneT will inform the BSP of this, stating the matters that are missing in the application. This 
also applies in case of non-compliancy with the regulations. 
In case TenneT considers that the application is incomplete, additional required information shall be 
submitted within four weeks from receipt of the request for additional information. If the potential BSP-FCR 
does not supply the requested information within that deadline, the application shall be deemed withdrawn.  

21 
 
C1 – Public Information 
5.1.3.2 Substantive assessment of the Technical Installation 
TenneT evaluates the application for prequalification by establishing whether the minimum requirements 
specified in this manual have been fulfilled. Not fulfilling the minimum requirements will result in the 
application for prequalification being declined. 
5.1.3.3 Submission of allocation messages, measurement values and baseline 
In order to be prequalified (for the first time), the BSP or a party assigned by the BSP must be in a position to 
submit allocation messages in accordance with §4.7 and the ‘FCR Implementation Guide’ document. The 
BSP must also be able to submit measurement and baseline data in accordance with chapter 4. 
 
Within three (3) months from confirmation that the application is complete, TenneT will evaluate the 
information provided, in accordance with SO-GL Article 155 paragraph 4, and decide whether the RPG/RPU 
meet the criteria for an FCR prequalification. 
5.1.4 Prequalification Status 
Once the prequalification procedure has been completed, TenneT will inform the BSP of the result of the 
prequalification. When the prequalification has been awarded, the BSP is entitled to participate in the 
tendering procedure on the auction platform (Regelleistung.net). For this the framework agreement 
between TenneT and the BSP then needs to be concluded. If a TI or group of TIs has/have already been 
prequalified as RPU/RPG, and a framework agreement has already been entered into, then the relevant 
prequalified RPU/RPG will be added to the existing framework agreement. 
5.1.5 Termination/withdrawal of the prequalification 
TenneT is entitled to terminate a prequalification at any time if: 
• in providing TenneT with information during the procedure for prequalification, the prequalified BSP is 
found to be guilty of making false statements and/or submitting incorrect information; 
• after prior notice of default in which he/she the BSP was given a reasonable period for remedy, the 
prequalified BSP no longer fulfils the minimum requirements as specified in these regulations. 
• the above can no longer be verified. 
Should the occasion arise, TenneT will inform the BSP in question of its intention to terminate the 
prequalification and of the reason for this, in writing.  
 
5.2 Volume to be prequalified 
5.2.1 Volume for prequalification at initial recognition of an FCR-BSP 
At the (first) application for recognition as an FCR-BSP a minimum of 1 MW (being a combination of RPUs 
and or RPGs) must be offered for prequalification. 
 
TenneT allows an individual unit (RPU), or a group of units (RPG), to prequalify with a minimum of 0.1 MW of 
rated power - with a step size of 0.10 MW. Volumes of 0.10 MW, 0.20 MW, but also 1.10 MW, 1.20 MW etc. 
are therefore allowed. As long as the combined power of the RPU and RPG has a minimum power of 1 MW.  
 

22 
 
C1 – Public Information 
A RPU and/or TI with a prequalified power of less than 1 MW shall be prequalified together with another RPU 
/ RPG. Combined the minimum capacity must be 1 MW of prequalified power. 
 
The creation of an RPG is always in consultation with TenneT. TenneT is entitled to set out requirements on 
RPGs (For instance no combinations of installations with very large differences in nominal power). 
 
As example: when the total prequalified power is for example 1.3 MW and the awarded power in auction is 1 
MW and there could be delivered with multiple RPUs, it is up to the BSP to distribute the 1 MW over his 
RPUs with a resolution of 0.10 MW. 
5.2.2 Additional volume for prequalification 
The minimum additional power to be prequalified in an RPU/RPG (after initial prequalification of at least 1 
MW) is 0.10 MW or multiples of this.  
After approval of the TSO, the unit or units can be added to the RPG or act as a single RPU. The risk of this 
addition to an existing RPG (e.g. disrupting the other units in the RPG) shall lie at the BSP.  
Adding volume doesn’t need adaption of the framework-agreement. 
 
The creation of an RPG is always in consultation with TenneT. TenneT is entitled to set out requirements on 
RPGs (For instance no combinations of installations with very large differences in nominal power. 
 
In addition: offering the extra power at the auction remains the same, i.e. with a step size of 1 MW. However, 
the BSP does have the choice of using the required installation(s) for a bid from its entire prequalified 
volume. The resolution for allocation messages is therefore 0.10 MW.  
 
5.3 Special RPG (SRPG)  
An RPG may comprise no more than 150 MW of prequalified power. In the case of an RPG, the FCR-BSP 
shall provide an aggregated measurement and baseline signal for the whole RPG, allowing clear verification 
of FCR activation. The allocation of an RPG is made at RPG level. 
 
 
Figure 8: Special Reserve Providing Group 


23 
 
C1 – Public Information 
In Figure 8 the RPG is a defined collection of TIs where although not each individual TI is able to meet the 
requirements for FCR, the whole RPG can do so.  
 
Allowing an RPG for FCR supply will also entail a data aggregation test. Data from both individual FCR-
providing units and from the whole pool shall be submitted for the purpose of checking the prequalification. 
5.3.1 Type approval in a special RPG 
TIs of the same type with a rated power of less than 1.5 MW and which can be shown to have the same 
control behaviour as TIs that have already been prequalified do not need to undergo an individual 
prequalification test. These TIs can be added to an RPG after TenneT's approval on the basis of information 
supplied showing that the control behaviour is complementary to the control of the entire RPG.  
TenneT reserves the right to decline the technical installation or to demand an additional prequalification test.  
 
The risk of any negative effects on supply as a result of added type-approved TIs, even after TenneT's 
approval, remains with the BSP.  
If a TI's prequalification test is carried out within an RPG, whereby the RPG participates in FCR supply with 
the volume awarded at auction, the risk of negative effects on the (regular) delivery remains with the BSP.  
5.3.2 Modifications within a special RPG  
FCR-providing units can be added to an RPG in steps of 0.10 MW, after an approved prequalification of the 
TI in question.  
 
In the case of the merger/division of already prequalified RPGs (pools) into a new RPG (pool), TenneT may 
require the new RPGs to undergo a new prequalification test. 
5.4 Repetition of prequalification 
In the following situations the prequalification will end, and re-prequalification is necessary: 
• After five years, the FCR-BSP shall be reassessed by means of a prequalification test, whereby TenneT 
can demand a new test (SO GL Art 155 paragraph 6). In the case of an RPG (as mentioned in §5.3), the 
whole RPG will need to be prequalified again; 
• If the technical specifications, availability specifications or specifications of the FCR equipment have 
been changed; 
• In the event of modernisation of the equipment used for FCR activation. 
 
Any modifications in RPU/RPG that will impact the FCR supply must be discussed with TenneT. Additional 
agreements could be made according to the numbers and volumes of varying TIs. 
 
Be aware. Once the pre-qualification has expired, no FCR can be supplied. So be sure to re-qualify in time. 
 
5.5 Flowchart showing prequalification types 
The figure below (Figure 9) shows how TenneT categorises the technical prequalification.  
 

24 
 
C1 – Public Information 
 
Figure 9: Flowchart showing prequalification types 
6. Prequalification tests 
6.1 Test protocol 
6.1.1 Introduction 
In order to prequalify for the supply of FCR, the RPU/RPG’s technical requirements must be tested as 
described below. The installation settings and the corresponding controls (e.g. droop) must be set as they 
would be in normal operation. Changing settings in order to pass (specific) tests is not permitted. During the 
prequalification test, stepwise and uniform frequency deviations from the nominal frequency will be 
simulated.  
6.1.2 Explanation of droop 
It should be noted that a certain percentage of the rated power that is to be prequalified corresponds with a 
certain droop.  
The droop settings depend on the amount of power to be prequalified and can be calculated by using: 
 
𝑥𝑥 =  −Δ𝑓𝑓/𝑓𝑓𝑛𝑛𝑛𝑛𝑛𝑛
Δ𝑃𝑃/𝑃𝑃𝑛𝑛𝑛𝑛𝑛𝑛
∙ 100% 
Where: 
∆f  = frequency deviation in Hz (defined as ∆f = f - fnom) 
fnom  = nominal frequency (= 50 Hz) 
∆P  = difference in capacity for the purpose of FCR in MW 
Pnom = nominal power in MW 
x  = droop in % 
 


25 
 
C1 – Public Information 
The full FCR volume must be activated if the (quasi-stationary) frequency deviation is ± 200 mHz. Together 
with Pnom and the offered bid size, this forms the basis for calculating the droop for the unit concerned. The 
table below gives an example of this with 500 MW as nominal power and 20 MW as FCR capacity: 
 
Description Value 
∆f =  0.2 Hz 
fnom =  50 Hz 
∆P =  20 MW 
Pnom =  500 MW 
x =  𝑥𝑥 =  −𝛥𝛥𝑓𝑓/𝑓𝑓𝑛𝑛𝑛𝑛𝑛𝑛
𝛥𝛥𝑃𝑃/𝑃𝑃𝑛𝑛𝑛𝑛𝑛𝑛
∙ 100% 
 
𝑥𝑥 =  0.2/50
20/500 ∙ 100% 
 
𝑥𝑥 =  10% 
Table 2, Explanation droop 
The sample data used in the above table includes a power change in relation to frequency as shown in 
Figure 10. 
 
 
Figure 10: Droop corresponding with the above example 
Please note: Energy limited sources that (when disregarding load management) at a grid frequency of 
50.000 Hz do not have any power exchange with the grid, may specify 0% as droop. 
6.1.3 Explanation of insensitivity range 
The maximum combined effect of inherent frequency response insensitivity and possible intentional 
frequency response dead band of the governor of the FCR providing units or FCR providing groups is 10 
mHz, according to Annex V of SO-GL 
Unlike a dead band, applying an insensitivity range means that a response (set point to a unit) from the 
controller is required when the threshold value at the controller input value is exceeded. On no condition may 
-25
-20
-15
-10
-5
0
5
10
15
20
25
49.8 49.9 50 50.1 50.2
FCR Power [MW]
Frequency [Hz]

26 
 
C1 – Public Information 
the insensitivity lead to reduced response, which means that at 200 mHz frequency deviation, there must be 
a full response.  
 
An insensitivity range of 10 mHz around the operating point is allowed so the FCR control is more stable. 
This means that a frequency change of 9 mHz relative to the current operating point (set point of the FCR 
controller) does not have to result in a power change; however, a change of 10 mHz or more must result in a 
power change for the full value corresponding to the set droop. Graphically, this can be shown as follows 
(Figure 11). 
 
 
Figure 11: Example of insensitivity 
In addition: A dead band is therefore an insensitivity range around a specific value, while an insensitivity 
range can be around any value5. 
6.1.4 Requirements 
The following requirements are also partially set out in section 3.1, but for the sake of completeness they are 
included again here: 
• Accuracy of the power measurement: margin of error <1% (of the nominal value, class 0.5s). 
• Accuracy of the desired frequency measurement: <10 mHz. 
• Measuring interval: test a-f resolution of 1 second. Test g: resolution of 1 to 4 seconds is acceptable.  
The different measurements must have an unambiguous time stamp and be time-synchronous. 
 
A. The following requirements apply to all tests, and are to be considered valid during normal operation: 
1) The power change shall not be artificially delayed and shall start as soon as possible after a 
frequency deviation6; 
 
5 Also see COMMISSION REGULATION (EU) 2016/631 of 14 April 2016) network code on requirements for grid connection of 
generators (GL-RFG) Art 2:  
39. ‘dead band of the frequency response’: the intentionally introduced interval within which the frequency control does not respond;  
40. ‘frequency response immunity’: the inherent characteristic of the control system, specified as the minimum size of the change in 
frequency or input signal that results in a change in output power or output signal; 
6 If the delay lasts longer than two seconds, the owner of the electricity production plant shall justify the delay and provide TenneT with a 
technical statement [rewritten from RfG code, Article 13, paragraph 2.e.]. 


27 
 
C1 – Public Information 
2) Overshoot is not desirable. When overshoot (in either direction) occurs the BSP is obliged to 
give a clarification on that matter; 
3) The power change, corresponding to the simulated frequency deviation, must be supplied during 
the set period (as specified in the test descriptions below). 
 
B. The following requirements apply to the responses to stepwise frequency changes (tests a to f): 
1) At least 50% of the power change corresponding with the simulated frequency change must be 
supplied within 15 seconds from the beginning of each frequency step; 
2) The power change corresponding with the simulated frequency change must be supplied within 
30 seconds from the beginning of each frequency step; 
3) The power change should behave at least linearly between 15 and 30 seconds after each 
frequency step. 
6.1.5 Description of tests to be performed 
The tests shall be conducted by qualified technicians under the responsibility of the BSP. The measurement 
results are the basis of the prequalification. The RPU/RPG must remain connected to the grid during the 
tests. 
The tests to be performed assess the power to be prequalified; the droop (sensitivity) is set such that the 
expected power changes are realised.  
BSP shall perform the tests described below, where ‘power’ means the power that is to be prequalified. After 
consultation with TenneT a BSP can deviate from the following order. 
 
It should be noted that in case of energy-limited units (for instance batteries), a State of Charge (SoC) can be 
agreed instead of a power set point from which the tests are conducted. In such a case, the agreed State of 
Charge shall be used as the starting point for each partial test. 
If applicable, charge management and thus also reserve mode if applicable, must be switched on during the 
tests, including the conditions for alert state. 
 
Besides frequency and power, energy-limited units should also include the State of Charge as a 
measurement value: During the tests a) to e), the power achieved after reaching the set point corresponding 
to the simulated frequency deviation must be supplied for at least 15 minutes. The counting of these 15 
minutes starts from when the power reaches the setpoint and stops when the new setpoint is given. 
 
If the prequalification involves FCR-providing units that are only going to supply FCR in one direction, then 
the following applies: 
• Where power only provides support in the event of frequency reductions (frequency deviation <0 mHz), 
tests a) and d), are omitted. Tests c) and f) may be executed only in the applicable direction; 
• Where power only provides support in the event of frequency increases (frequency deviation >0 mHz), 
tests b) and e) are omitted. Tests c) and f) may be executed only in the applicable direction. 
 
a) At a power setting between minimum net power and maximum net power, established in consultation 
with TenneT, the full power reduction must be achieved within 30 seconds at a simulated frequency step 
of +200 mHz. The power change shall be then maintained for at least 15 minutes, after which a 
simulated frequency step shall be made to 0 mHz deviation (in relation to the nominal frequency). After 

28 
 
C1 – Public Information 
the simulated frequency step to 0 mHz deviation is finalised, the next test can be started; thus, no need 
to wait for 15 minutes in between the tests. For each of the two frequency steps, the power change must 
meet the requirements set out in section 6.1.4, paragraph A and paragraph B. 
 
b) At the power setting stated under a), the full power increase must be achieved within 30 seconds at a 
simulated frequency step of -200 mHz. The power change shall be maintained for at least 15 minutes, 
after which a simulated frequency step shall be made to 0 mHz deviation (in relation to the nominal 
frequency). For each of the two frequency steps, the power change must meet the requirements set out 
in section 6.1.4, paragraph A and paragraph B. 
 
c) At the power setting stated under a), half of the power reduction must be realised in 30 seconds at a 
simulated frequency step of +100 mHz. The power change must be maintained for at least 15 minutes, 
after which a simulated frequency step shall be made to -100 mHz deviation (in relation to the nominal 
frequency). The power change must be maintained for at least 15 minutes, after which a simulated 
frequency step shall be made to 0 mHz (in relation to the nominal frequency). For each of the three 
frequency steps, the power change must meet the requirements set out in section 6.1.4, paragraph A 
and paragraph B. 
 
 
d) At the power setting stated under a) the frequency steps enlisted below must be simulated successively. 
For each frequency step, the power change must meet the requirements set out in section 6.1.4, 
paragraph A and paragraph B. 
• Frequency deviation = 0, at the beginning of the test; 
• Frequency step shall be made to +99.99 mHz deviation (in relation to the nominal frequency), the 
corresponding power change must be maintained for at least 15 minutes7; 
• Frequency step shall be made to +200 mHz deviation (in relation to the nominal frequency), the 
corresponding power change shall be maintained for at least 15 minutes; 
• Frequency step shall be made to 0 mHz deviation (in relation to the nominal frequency).  
 
e) At the power setting stated under a) the following frequency steps must be simulated successively. For 
each frequency step, the power change must meet the requirements set out in section 6.1.4, paragraph 
A and paragraph B. 
• Frequency deviation = 0, at the beginning of the test; 
• Frequency step shall be made to -99.99 mHz deviation (in relation to the nominal frequency), the 
corresponding power change shall be maintained for at least 15 minutes8; 
• Frequency step shall be made to -200 mHz deviation (in relation to the nominal frequency), the 
corresponding power change shall be maintained for at least 15 minutes; 
• Frequency step shall be made to 0 mHz deviation (in relation to the nominal frequency).  
 
f) At the power setting stated under a), a steady power decrease of the full power must be realised in 2 
minutes at a simulated steadily increasing frequency deviation of 0 mHz to +200 mHz. After the power 
set point due to the power change has been reached (corresponding to a frequency deviation of +200 
 
7 In relation to Alert state frequency deviation: |Δf| ≥50 mHz for 15 minutes, |Δf| ≥100 mHz for 5 minutes or instantaneous |Δf| ≥200 mHz.  
8 In relation to Alert state frequency deviation: |Δf| ≥50 mHz for 15 minutes, |Δf| ≥100 mHz for 5 minutes or instantaneous |Δf| ≥200 mHz. 

29 
 
C1 – Public Information 
mHz) and the supply is stable (thus the power change is not necessary maintained for 15 minutes), then 
the simulated frequency deviation will steadily go to -200 mHz in 4 minutes. Once the supply is stable 
again, the frequency deviation will steadily return to 0 mHz in 2 minutes. For each of the three changes in 
simulated frequency, the power change must meet the requirements set out in section 6.1.4, paragraph 
A. The power changes must be linear and be fully achieved within 2.5, 4.5 and 2.5 minutes respectively 
(max 30-second lag in simulated frequency response9). 
 
 
g) Once the above tests have been completed satisfactorily, the RPU/RPG shall follow the frequency for 4 
hours under normal operational conditions with the full FCR volume.  
6.1.6 Reporting and evaluation 
In order to fulfil the prequalification requirement, the BSP must provide the results of the tests as an annex, 
including at least: 
• A description of the volume to be prequalified; 
• Measurement protocol including the relevant measurement results;  
• Description of baseline construction and relevant data to support this 
• Test structure, precise specification of the measuring points; 
• Test time, list of tests performed; 
• Description of the way the tests have been done and at which relevant settings; 
• The original time-synchronous data including at least: 
• date and time; 
• actual or simulated frequency; 
• power measurement; 
• baseline; 
• State of Charge, if applicable. 
• If applicable, a description of the charging management (this is also part of the required prequalification 
documentation) and if applicable the description of the reserve mode; 
• Persons involved in the test (including the contact for the test). 
The results will be checked by TenneT or by an independent third party appointed by TenneT.  
6.1.7 Sample report 
A sample report for information about the expected layout of the test result report must be used and can be 
found on TenneT’s website.10 
 
7. Auction scheme 
7.1 General 
 
 
9 The power changes must be fully achieved within 2.5, 4.5, 2.5 minutes respectively, with a maximum allowed delay of 30 seconds. 
Therefore, the "lag of max. 30 seconds" is intended in the reaching of the desired set point as a response to the simulated frequency . 
10 https://www.tennet.eu/electricity-market/ancillary-services/fcr-documents/  

30 
 
C1 – Public Information 
• The BSP has entered into a framework agreement with TenneT which shall remain in force at least until 
the end of the auction period; 
• Upon the contract being awarded, the BSP shall remain continually available during the entire 
reservation or supply period, without intervention or action on the part of TenneT; 
• Reimbursement is based on marginal pricing and depends on the highest awarded bid in the 
Netherlands when and if this is higher than the Cross Border Marginal Price; or Cross Border Marginal 
Price if this is higher than the highest awarded price of a Dutch bid. More information about Cross Border 
Marginal Pricing is to be found in the description document of the platform algorithm which is to be found 
on the TenneT website; 
• Energy costs, possible imbalance costs, network use charges etc. shall be borne by the BSP.  
 
7.2 Definitions 
Prequalified 
power: 
The power that fulfils all requirements to participate in the auction for FCR, as specified in 
this manual and the framework agreement. 
Auction period: The entire period for which the FCR auction concerned is being held. 
The auction period is 4 hours. 
Bid period: The entire period in which the BSP can submit a bid for making available and supplying 
FCR for the corresponding auction period 
Gate opening time is D-14. 
Award: TenneT’s notification by which the supply contract is concluded. 
Award period: The entire period from closure of the bid period to award. D-1 between 8:00 – 8:30. 
Closing date:  The end of the bid period.  
The closing date and award takes place at d-1(also in weekends and holidays) at 08:00  
GCT 8:00 (CET) Monday Tuesday Wednesday Thursday Friday Saturday Sunday 
Delivery (D) Tuesday Wednesday Thursday  Friday Saturday  Sunday Monday 
 
7.3 Bids  
7.3.1 Bid 
1 The bid shall include the following data: 
• Name of the BSP; 
• Period to which the bid applies (dd.mm.yyyy); 
• Product type (PRL); 
• Area where actual delivery takes place (Netherlands; 10YNL----------L); 
• EIC code of the BSP; 
• Product name ((NEGPOS_00_24)); 
• The FCR being offered is symmetrical (3 MW = 3 MW up and 3 MW down) and in whole MW 
values with a minimum of 1 MW; 
• Remark bids as divisible or indivisible. Indivisible bids are at maximum 25 MW; 
• The price in €/MW. 
2 The bid must satisfy the following conditions: 

31 
 
C1 – Public Information 
• The bid shall contain all elements stated under the previous point and shall be unambiguous and 
without reservation; 
• The bid shall be submitted on the internet platform before the closing date; 
• The bid for volume shall relate to the entire period for which the FCR auction is being held 
(auction period); 
• The bid (in this case the price or availability price) shall apply to the full period for which the FCR 
auction concerned is being held. 
3 The BSP is responsible for the correctness and accuracy of its bids. Any errors or mistakes made shall 
be borne entirely by the BSP. Any incomplete or unclear bids will be regarded as not having been 
submitted. 
4 The BSP may bid up to the total of its individual prequalified power. 
5 When bidding, the BSP must take all limiting circumstances (for example in its production units or 
possible congestion) into consideration with the volume to be bid. 
7.3.2 Bids via the internet platform 
1 Bids must be submitted via the ‘Regelleistung.net’ internet platform. Before the BSP can bid, a ‘bidder 
environment’ must be set up. The corresponding access rights will be supplied by TenneT after the 
BSP has signed the framework agreement and accepted the corresponding Appendices; 
2 Details about the format, content and method of submitting bids and awarding the contract as also 
documents about the Web-API for bids are available in the ‘bidder environment’. TenneT reserves the 
right to change the format and/or method of bidding. If such changes are made, the BSP will be 
informed well in advance of their implementation date; 
3 The BSP has until the end of the bid period to submit bids;  
4 The BSP may change its bid up to the end of the closing date. Submitting a new bid will overwrite the 
previous bid and a new time stamp will be given. This means the previous bid will lose its validity; 
5 All bids will apply independently of each other. 
7.3.3 Legal aspects relating to electronic bids 
1 The parties acknowledge that the electronic bids submitted and award decisions are considered to be 
legally binding even without a handwritten signature, without an electronic signature and/or encryption, 
insofar as relevant legislation allows this; 
2 The BSP shall remain responsible for its documentation and retention obligation. The internet platform 
does not provide any documentation or archiving capability.  
7.3.4 Breakdown in data connections and/or internet platform 
1 In the event of the internet platform being unavailable or if there are other serious system restrictions, 
then after consultation with other participating TSOs, TenneT will be entitled to suspend the current 
auction and, if possible, repeat it at a later date. In such a case, TenneT will make an announcement 
no later than at the end of the regular award period. In this case § 7.4.4 is applicable; 
2 If only the connection between the BSP and the internet platform is disrupted and after prior telephone 
consultation with TenneT11, the BSP will be given the opportunity of sending TenneT a complete bid in 
 
11 TenneT backoffice Lehrte in Germany 

32 
 
C1 – Public Information 
the specified electronic XML file by e-mail12. The BSP shall remain responsible for its bids in this form 
of tendering and shall be bound by all ensuing rights and obligations. In particular, the BSP shall 
remain responsible for submitting its bid in time, for the completeness of the information, the formal 
correctness of its bids and the electronic legibility of the XML-file; 
3 In the event of disruptions to the internet platform or individual connections, the results shall only be 
announced after the usual award period. In the event of a delay, the BSP will be informed as soon as 
possible. If there are significant delays, TenneT reserves the right, in consultation with other 
participating TSOs, to cancel the tendering procedure and repeat it at a later date. TenneT is not 
obliged to provide compensation for any losses resulting from such delays. 
 
7.4 Awarding 
7.4.1 Award decision 
The award shall take place on the basis of the bids, which are valid pursuant to § 7.3.1, from the relevant 
auction and after evaluation of the award criteria pursuant to § 7.4.2 The decision to award the FCR is non-
discriminatory. The award shall be made separately for each tender in accordance with the published 
deadlines. 
7.4.2 Award criteria 
The purpose of the award is to acquire FCR at the lowest possible price/collective price. 
1 The awarding of the bids is carried out in the tendering process on the basis of the following criteria: 
• Lowest price performance; 
• In the event of equal prices: oldest entry time stamp. 
2 The following conditions shall apply in the event of the contract being awarded: 
• If a bid is divisible FCR may be partially awarded. The then partially contracted FCR shall be at 
least equal to the minimum bid size and no greater than the power offered in the bid. It is payable 
in whole steps of 1 MW. The price of the bid shall remain unchanged;
 
• A nondivisible bid with a price lower than the marginal price can be rejected when the costs for 
FCR for the TSO’s become lower by this, even if the nondivisible bid is 1 MW; 
• An extensive description of the working of the algorithm can be found on tennet.eu. 
3 In consultation with the other participating TSOs, TenneT reserves the right: 
• To adjust the award criteria to changes or regulatory amendments. TenneT shall inform the BSPs 
of any changes without delay. The BSP’s permission is not required;
 
• In consultation with the regulator, bids whose prices distort the market may be excluded. The 
exclusion criteria given by the regulator in that case will be published.
 
7.4.3 Announcement of award and establishment of supply contract 
1 In principle, the internet platform is used for the notification of the award. The result can be seen on the 
platform at the end of the award period. There will be no supplementary written notification. After the 
end of the Award period, the BSP shall therefore be obliged to find out about the result on the internet 
platform; 
 
12 Via backoffice-d@tennet.eu 

33 
 
C1 – Public Information 
2 If the notification of award is not possible via the internet platform for technical reasons, then an e-mail 
will be sent to the contact on the contact list in the framework agreement; 
3 With the award, a supply contract between the BSP and TenneT is concluded for the reservation and 
supply of FCR for the duration of the auction period and under the conditions of the framework 
agreement; 
4 BSPs can transfer the obligation, on terms that transfer must take place symmetrical, in steps of 100kW 
and with a minimum of 100 kW. 
7.4.4 Delay in award 
If at the end of the award period an electronic announcement of the award is not possible for technical 
reasons, then an e-mail will be sent from the Regelleistung platform to all bidders. The used e-mail 
addresses are subtracted from annex 2 'contacts' of the framework agreement13. It is of great importance the 
contact list is maintained up to date by the BSP.  
In these exceptional cases, the bids will remain valid until a deadline is communicated by e-mail.  
7.5 Fallback procedure in the event of an auction shortfall 
In an exceptional situation, there may be a shortage of bids for an auction. There are two situations in which 
a fallback auction can take place. 
1. The total volume offered in the joint auction is insufficient; 
2. The volume offered from Dutch BSP is insufficient to fulfil the minimum obligation of FCR in the 
Netherlands (30% of the Dutch obligation). 
 
A fallback auction takes place via the Regelleistung platform. The BSPs are invited for a second auction. If 
the total volume offered is insufficient, all BSPs are invited to the second auction. In case of a shortage to 
cover the Dutch part, only the Dutch BSPs will be invited. The new auction is a separate auction and results 
in a new price that has no impact on the first auction. The second auction then results in the regular process. 
The BSP must distribute the total volume awarded via the allocation message. 
 
8. Appendices 
8.1 Appendix Normal versus Reserve Mode 
Definitions 
Normal mode:   Activation of FCR depending on system frequency deviation. 
Reserve mode:  Activation of active power response depending on short term frequency deviation 
from the mean frequency deviation. 
Alert state:  |Δf| ≥ 50 mHz during 15 minutes, |Δf| ≥ 100 mHz during 5 minutes of |Δf| ≥ 200 mHz 
instantaneous. 
T
FAT: Full Activation Time aFRR; 5 minutes14. 
 
 
13 The mail adresses mentioned at subject "Aanspreekpunt veiling primaire reserve" in the contact lists are used. It is possible to add 
multiple contacts on that subject to have backup in case of absence of the first contact. 
14 TFAT aFRR will change (expected July 2022) from 15 to 5 minutes 

34 
 
C1 – Public Information 
Normal mode versus reserve mode 
LER FCR supplying units (individually or belonging to a LER FCR supplying group) that have technical 
capability (especially inverter-connected assets) are able15 to switch from normal mode to reserve mode 
when the upper (socmax) or lower (socmin) limits of the SoC are exceeded. These limits are defined as the 
amount of energy needed to supply FCR during a time interval equal to the full activation time of aFRR being 
5 min: 
 
•  
 
 
Where: 
- C is storage capacity in MWh; 
- P is the FCR offered capacity in MW; 
- ∆tFAT is the aFRR full activation time in hours (0,0833….. hour, 
1
12 hour). 
 
• When the SoC is restored, the unit returns to normal mode. 
In normal mode the unit responds to the normal frequency deviation ∆f
(t), whereas in reserve mode 
the unit responds to the short term frequency deviation only by following the average frequency: 
 
 
 
• During the transition period from normal mode to reserve mode and vice versa, the unit responds to 
the combination f
reaction(t) of normal frequency deviation and short-term frequency deviation, as 
described by the following equation: 
 
 
 
Where: 
- T is defined as a weighted function. 
 
• For transition from normal mode to reserve mode: 
 
 
 
Where: 
- t start is the time when the upper or lower SoC are exceeded. 
 
 
15 If the installation is technically not able to implement this, a technical argumentation must be provided 


35 
 
C1 – Public Information 
• For the transition from reserve mode to normal mode: 
 
 
 
Where: 
- trestore the time after which the upper or lower SoC value is no longer exceeded. 
 
The insensitivity range must be observed in both normal and reserve mode (the full frequency range is used 
as the input signal, but the FCR delivery is limited to momentary frequency deviations in reserve mode). 
  


36 
 
C1 – Public Information 
8.2 Appendix update allocation notice and penalties 
 
In the image below is a representation of the penalties determined if the incident occurs within one Auction 
Period, including the relationship with (update of) the allocation message: 
 
Figure 12: Example 1 of updating allocation message 
 
In the event that an incident continues over several auction periods, penalties shall be determined as follows: 
 
Figure 13: Example 2 of updating allocation message 
Auction period 1
2 2 2 2 2
2 2
 -->   1 2 -->   1 1 1
2 1 1 1 1 1 1
2 1 1 1 1 1 1
send updated allocation message
Penalty 1: Lack of response (factor 20) based on  max frequentie deviation between time incident and first adapted ISP in updated allocation message.
Penalty 2: Non availability (factor 5) based on updated allocatiemessage till end of auction period
Penalty 3: Non availability (factor 5) based on updated allocatiemessagebased and new auctionperiod (if applicable) 
ISP 1 ISP 2 ISP 3 ISP 4 ISP 5
Incident
Auction result Allocation Actual response observed response
ISP 2 and 3 adapted in the past;  4 and  5 in the future 
(Non availability kan be adapated up to 2 ISP's in the 
past)
Auction period 1 Auction period 2 Auction period 2 Auction period 3
ISP 33
2 2 2 2 2
2 2 2 -->   1 2 -->   1 1
2 1 1 1 1 1 1
2 1 1 1 1 1 1
send updated allocation message
Penalty 1: Lack of response (factor 20) based on  max frequentie deviation between time incident and end of auction period
Penalty 1a: Lack of response (factor 20) based on  max frequentie deviation at start of auction period 2 till first adapted ISP (18) in updated allocation message.
Penalty 2: Non availability (factor 5) based on updated allocatiemessage till end of auction period
Penalty 3: Non availability (factor 5) based on updated allocatiemessagebased and new auctionperiod (if applicable) 
Incident
Auction result Allocation Actual response observed response
ISP 18 and 19 adapted in the past;  20 and further updated for the future ISP's 
(Non availability kan be adapated up to 2 ISP's in the past)
ISP 16 ISP 17 ISP 18 ISP 19
ISP 20 
(continue till and enclosed ISP 32)
