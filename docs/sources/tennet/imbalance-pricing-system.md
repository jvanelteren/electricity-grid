<!-- Source: https://tennet-drupal.s3.eu-central-1.amazonaws.com/default/2024-10/Imbalance%20Pricing%20System.pdf
     Retrieved: 2026-06-21 (PDF, text extracted) -->

# imbalance-pricing-system

Source PDF: https://tennet-drupal.s3.eu-central-1.amazonaws.com/default/2024-10/Imbalance%20Pricing%20System.pdf
Local copy: files/Imbalance Pricing System.pdf

---

VERSION 6.1 
VERSION DATE 21 October 2024 
PAGE 1 of 18 
 
 
 
Imbalance Pricing System 
 
How are the (directions of) payment determined? 
 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 
 
 
Version Date Brief description of amendment 
1.00 30/11/2000 First draft 
1.1 07/12/2000 Changes to incentive component table 
2.0 21/12/2000 DTe decision 00127, dated 19/12/2000 
2.1 01/02/2001 Explanation 5.2.3 improved 
3.1 01/08/2005 Total Review Document, DTe decision 102055, dated 26/10/2005, 
Redefinition 2-sided regulation 
3.2 01/12/2006 Modification 3.3 in connection with changed FVR functionality 
3.3 01/05/2009 Modification 5 in connection with changed decision tree 
3.4 01/06/2010 Incentive component moved to 'Implementation Guide' 
3.5 09/06/2015 Mid-price in the event of ‘reverse pricing’ 
3.6 01/10/2016 Modification pricing in the event of incident reserve for downward 
regulation 
4.0 13/02/2019 Complete update of the document 
5.0 31/07/2020 Abolishment of incentive component 
5.1 14-10-2020 Update footnote 15 about balance delta 
6.0 30-03-2022 Removal product mFRRsa, correction of some flaws in relation to 
price determination in case of usage of mFRRda, and incorporating 
faster publication of balance delta. 
6.1 21-10-2024 Clarification on PICASSO impact 

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 2 of 18 
 
Table of Contents 
 
1. INTRODUCTION .......................................................................................................................................................3 
2. DEFINITIONS AND TERMINOLOGY ...........................................................................................................................3 
3. STARTING POINTS OF THE BALANCING SYSTEM IN THE NETHERLANDS  ...................................................................6 
3.1 TASKS AND ROLES REGARDING BALANCING .......................................................................................................................... 6 
3.2 OVERVIEW OF BALANCING PROCESS ................................................................................................................................... 7 
3.3 INCENTIVES .................................................................................................................................................................. 8 
4. THE MERIT ORDER: HOW ARE BALANCING ENERGY PRICES DETERMINED?  .............................................................9 
4.1 SIGN CONVENTION OF THE IMBALANCE PRICING SYSTEM ........................................................................................................ 9 
4.2 PRICE MECHANISM FOR BALANCING ENERGY ..................................................................................................................... 11 
4.3 REGULATION STATES .................................................................................................................................................... 12 
5. IMBALANCE PRICE: HOW IS THE IMBALANCE PRICE DETERMINED? ....................................................................... 14 
6. FINANCIAL RESIDUE AT TENNET ............................................................................................................................ 16 
6.1 VOLUMES AND COSTS ................................................................................................................................................... 17 
6.2 RELATIONSHIP WITH THE REGULATED TARIFFS .................................................................................................................... 18 
 
 
  

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 3 of 18 
 
1. Introduction 
In the 1998 Electricity Act (article 16), TenneT TSO B.V. was assigned the statutory role of maintaining the 
balance between the injection of electricity to and withdrawal of electricity from the electricity grid. As part of 
the Dutch regulations, it is stated that market parties with an imbalance will be settled against the so- called 
imbalance price.1  
 
This document describes the system that is used to determine the imbalance price. TenneT TSO B.V. aims 
to use this document to provide market parties and other stakeholders insight into the definitions, process 
and (directions of) payment that are associated with the imbalance settlement.  
 
In order to outline the context for the imbalance pricing system, this document will also briefly reflect on the 
basic principles of the balancing system in the Netherlands. 
2. Definitions and terminology 
This section describes important terms in the context of the imbalance pricing system. In practice, both 
Dutch and English terms are used, therefore both terms are included in Table 1 below.  
  
Table 1. Explanation of Dutch and English definitions and abbreviations in the context of the imbalance pricing 
system. 
Dutch term English term Description  
Aanbieder van 
balancerings-
diensten 
Balancing Service 
Provider (BSP) 
A market participant with reserve providing units or 
reserve providing groups that can offer balancing 
services to TSOs. (EB GL2) 
Afregelbieding Downward bid Downward bidding from the BSP to the TSO. Per 
ISP, this contains such things as the BSP requested 
energy price (in €/MWh) and the quantity of power 
(in MW). 
Afregelen Downward 
regulation 
The reduction of injection or increase of withdrawal 
of electrical energy on/from the electricity grid at the 
request of the TSO with respect to balancing. 
  
 
1 See article 10.28 of the Netcode Elektriciteit (Electricity Grid Code). 
2 From COMMISSION REGULATION (EU) 2017/2195 establishing a guideline on electricity balancing; abbreviated in this table by EB 
GL. 

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 4 of 18 
 
Automatische 
Frequentie-
herstelreserves 
automatic 
Frequency 
Restoration 
Reserve (aFRR) 
aFRR is a service that the TSO obtains from the 
market with respect to balancing. aFRR is the 
international name for this type of service in EU 
regulations. 'Regelvermogen' is the former Dutch 
term, translated as 'regulating power'. Detailed 
product information is available on 
https://www.tennet.eu. 
Balanceringsverant-
woordelijke (BRP) 
Balance 
Responsible Party 
(BRP) 
A market party, or a representative selected by a 
market party, responsible for its imbalances (EB 
GL). In the past, BRP was also known as 
Programme Responsible Party (PR party).  
BRP-overschot  BRP surplus The electrical energy that a BRP injects in excess or 
withdraws to a lower extent from the electricity grid 
than indicated in its latest approved Commercial 
trade schedule. 
BRP-tekort  BRP shortage The electrical energy that a BRP injects to a lesser 
extent or withdraws in excess from the electricity 
grid than indicated in its latest approved Commercial 
trade schedule. 
Energieprogramma 
(E-programma)  
Commercial trade 
schedule 
A programme formulated by a BRP and submitted to 
the TSO that for each imbalance settlement period 
per day (24-hour period) contains: 
(i) the position; 
(ii) the internal commercial trade programme; 
(iii) the external commercial trade programme. 
(Definition Code Electricity)  
Onbalansnetting Imbalance Netting The process agreed between TSOs with which the 
simultaneous activation of FRR in opposite direction 
can be avoided, taking into account the respective 
FRCEs3 and the activated FRR. 
Inzetprijs Balancing energy 
price 
The price against which, at the TSO’s request, the 
energy supplied or taken off by a BSP is 
reimbursed. See pagagraph 4.2. 
Landelijke 
netbeheerder (TSO) 
Transmission 
System Operator 
(TSO) 
Transmission System Operator of the national 
electricity or gas grid. TenneT TSO B.V. is the 
designated TSO for electricity in the Netherlands.  
Manueel Frequentie-
herstelreserves 
direct activated 
manual Frequency 
Restoration 
Reserve direct 
activated 
(mFRRda) 
mFRRda is a service that the TSO obtains from the 
market with respect to balancing. mFRRda is the 
international name for this type of service in EU 
regulation. 'Noodvermogen' is the former Dutch 
term, translated as 'incident reserve'. Detailed 
product information is available on www.tennet.eu. 
Middenprijs Mid-price The mid-price is the average of the lowest price of 
the upward bids and the highest price of the 
downward bids on a merit order for an ISP. In 
specific cases, this price determines the imbalance 
price. 
Onbalans Imbalance An energy volume calculated for a BRP and that 
represents the difference between the volume 
assigned to the BRP and the final BRP position, 
 
3 Frequency Restoration Control Error. 

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 5 of 18 
 
including any imbalance modifications that are 
applied to that BRP, within a certain imbalance 
settlement period (EB GL).  
Explanation: When a BRP has a difference between 
the latest approved commercial trade schedule and 
the measurements of the actual injection of electric 
energy or withdrawal of electric energy at the 
connections in its portfolio, it causes imbalance.4  
Onbalansprijs  Imbalance price The price (positive, zero or negative) in every 
imbalance settlement period for an imbalance in 
every direction (EB GL). 
Onbalans-
verrekeningsperiode 
(ISP) 
Imbalance 
settlement period 
(ISP) 
The time unit over which the imbalance of BRPs is 
calculated (EB GL). Explanation: In the past, ISP 
was also known as Programme Time Unit (PTU). 
The ISP is fixed at 15 minutes. 
Opregelbieding Upward bid Upward bidding from the BSP to the TSO. Per ISP, 
this contains such things as the BSP requested 
energy price (in €/MWh) and the quantity of power 
(in MW). 
Opregelen Upward regulation The increase of injection or decrease of withdrawal 
of electrical energy on/from the electricity grid at the 
request of the TSO with respect to balancing. 
Regeltoestand  Regulation state The regulation state describes the various activation 
situations of balancing energy and is used to 
determine the imbalance price of an ISP.  
 
  
 
4 If FRR is called up by a BSP, the used volume is corrected on the BRP commercial trade schedule associated with the connections on 
which the FRR is supplied. 

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 6 of 18 
 
3. Starting points of the balancing system in the Netherlands 
3.1 Tasks and roles regarding balancing  
In the Netherlands and Europe, there are three distinct roles in the balancing system: the Transmission 
System Operator (TSO), the Balance Responsible Party (BRP) and the Balancing Service Provider (BSP) for 
FCR and FRR. These three roles are explained briefly below.  
 
1. Transmission System Operator – TSO 
The role of TSO in the Netherlands is fulfilled by the high-voltage grid operator, TenneT TSO B.V. 
The TSOs in the synchronous frequency area of Europe are jointly responsible for a stable 
frequency of 50 Hz. To fulfil this task, each TSO is responsible for monitoring, maintaining and 
restoring the balance between supply and demand of electrical power in its area. This is known as 
‘balancing’.  
 
TenneT is responsible for maintaining the power balance in the Netherlands. Power imbalance is the 
instantaneous undesirable power exchange of a TSO with the synchronous linked high-voltage grid. 
This power imbalance of the (Dutch) system as a whole is mainly the total of all instantaneous  
deviations of BRPs from their commercial trade schedule. These instantaneous deviations do not 
result in an immediate imbalance for BRPs as the commercial trade schedule represents an energy 
value per ISP (15 minutes). 
 
TenneT restores a power imbalance by taking measures. TenneT can obtain various services from 
the market for this
5:  
o automatic Frequency Restoration Reserve (aFRR);  
former Dutch term: Regelvermogen (Regulating power)  
o manual Frequency Restoration Reserve direct activated (mFRRda). 
former Dutch term: Noodvermogen (Incident reserve) 
 
2. Balance Responsible Party – BRP  
All connections to the electricity grid must be allocated to a by TenneT accredited BRP. Each BRP is 
obliged by law to send a commercial trade schedule to TenneT for each day . The BRP is financially 
responsible for its imbalance, that is the deviation from its commercial trade schedule, and pays or 
receives the imbalance price for this of the relevant ISP. TenneT TSO B.V. later sends an imbalance 
invoice to the BRPs.  
 
  
 
5 Detailed product information is available on www.tennet.eu. 

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 7 of 18 
 
3. Balancing Service Provider (BSP) 
The BSP is the market party from which TenneT activates power for its balancing task. For the aFRR 
product, bids can be submitted to TenneT. It is also possible for BSPs to sign a contract with 
TenneT, obliging them to send aFRR bids of a certain volume during the course of the contract. For 
mFRRda, no bids are submitted; only the availability of power is contracted.  
3.2 Overview of balancing process 
Generally, the balancing process runs as follows (presented in Figure 1 as a process diagram 6):  
 
Preparation day ahead: On the day prior to the delivery day (D-1), each BRP submits a commercial trade 
schedule for the delivery day. The TSO checks whether these commercial transactions add up to zero, so 
that the supply and demand of electricity is balanced for every ISP of the delivery day.  
 
Delivery day: The delivery day (D) is the day on which injections of electricity on and withdrawal of electricity 
from the electricity grid occur. BRPs should act in accordance with their submitted commercial trade 
schedules.7 If a power imbalance occurs at any point, TenneT will take measures to restore this within 15 
minutes.  
NB. BRPs can adjust their commercial trade schedule up to four ISPs prior to delivery ; for domestic trade 
this can be up to D+1 at 10.00 a.m. at the latest. BSPs can adjust their bids up to two ISPs prior to delivery. 
 
Settlement: After the delivery day (D+1), the process of financial settlement starts at 10.00 a.m. In this 
phase, the settlement prices are determined and published and the imbalance per BRP is then determined 
and invoiced. 
 
Figure 1. Process diagram: balancing process 
 
6 This process diagram is a simplified presentation. The option to change commercial trade schedules to D+1 is not included in this.  
7 See Article 1, paragraph o. and Article 31 of the Dutch Electricity Act 1998. 


 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 8 of 18 
 
3.3 Incentives 
The liberalisation of the energy market has been an important starting point in the design of the balancing 
system in the Netherlands. The balancing system is characterised by the fact that there is maximum space 
for freedom of trade and dispatch for market parties within the frameworks of the described tasks, roles and 
responsibilities. Various incentives (price signals) ensure that market parties do not only supply balancing 
energy to the TSO, but that they are, above all, able and are stimulated to restore the energy balance of the 
system at their own initiative in the role of BRP.  
 
The incentives are based on the following general principles: 
1. It is uneconomical for market parties to increase the power imbalance. 
2. It can be advantageous to reduce the power imbalance. 
Both incentives ensure that the market does not rely on the TSO to maintain the power balance, but 
manages this actively itself. 
  
One price incentive is that a uniform price per ISP is used for the settlement of balanc ing energy (the 
balancing energy price). This means that the price of the highest
8 or lowest9 activated bid or the price for 
mFRRda if higher/lower determines the price for all balancing energy volumes from aFRR and mFRRda in 
an ISP10 (see also paragraph 4.2). This price for balancing energy then is the basis for the imbalance price.  
 
This link between the bid price for FRR, the balancing energy price for FRR and the imbalance price limits 
the possibility of abuse of the imbalance pricing system, such as offering flexibility for extreme, speculative 
bid prices. Such a bid price can actually - if the bid is activated - result in a high imbalance price; the 
potential profit for the market party is also its potential loss if it has imbalance and its imbalance volume is 
higher than the activated balancing energy volume.  
 
As previously stated, market parties can also submit bids for balancing energy without a contract. The 
objective of this is to attract multiple suppliers and in doing so promote competition with regard to price 
setting. The link between the balancing energy price and the imbalance price ensures that imbalance acts as 
a competitive product on the balancing market. In order to enable the entire market to make a positive 
contribution to the power balance, market parties need up-to-date information about the status of the system 
balance. That is why TenneT publishes information each minute (with 2-minute delays) about the activated 
amount of balancing energy and the associated price information of the activated bids. TenneT also sends 
notifications to the market when, in the event of a large power imbalance, mFRRda is activated.   
 
This information enables all market parties, and thus not only the activated BSPs, to make an estimation at 
that point of the total system balance and of their opportunities to make a positive contribution to this and 
obtain a financial profit. This can enable BRPs to compete with BSPs, which stimulates market competition. 
 
 
8 In the event of upward bids. 
9 In the event of downward bids. 
10 The ISP is 15 minutes; a day thus contains 96 ISPs. 

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 9 of 18 
 
3.4 IGCC and PICASSO 
TenneT takes part in two European platforms for balancing: IGCC and PICASSO. The participation in these 
platforms leads to an exchange of the power imbalance between the participating TSOs.  
 
As a consequence of the participation in PICASSO the power imbalance is exchanged between participating 
countries insofar as cross-zonal capacity for exchange is available, in such a way that netting of shortages 
and surpluses takes place and the remaining power imbalance is relocated to the area with the most 
economical bids on the local merit order. 
 
As result of the participation in IGCC the power imbalance is netted proportionally between the participating 
TSOs. Netting through PICASSO is given preference over netting within IGCC because in PICASSO the 
prices in the different areas can be taken into account which will lead to a more economical result.  
4. The merit order: how are balancing energy prices determined?  
As previously described TenneT uses the aFRR and mFRRda products to manage the power balance. For 
the aFRR product, the BSPs submit bids, in which a distinction is made between upward bids and downward 
bids.
11 TenneT places the bids on two merit orders, one for upward bids and one for downward bids. 
Separately, for mFRRda contracts are used and no bids are submitted for this. 
 
TenneT activates bids in accordance with national legislation (‘Netcode Elektriciteit’ - Electricity Grid Code) 
and European regulations (SO GL12 and EB GL13). The activation leads to financial transactions between 
TenneT and the BSP and to an adjustment on the imbalance of the BRPs of the connections activated by the 
BSP.  
4.1 Sign convention of the imbalance pricing system  
The imbalance pricing system has the following sign convention, assuming a power change as viewed from 
the electricity grid (see also Figure 2): 
• Upward bids ensure the injection of electricity to the grid and have thus a positive sign, while 
downward bids withdraw electricity from the grid and thus have a negative sign. 
• BRP surplus means that the BRP injects more or withdraws less electricity from the electricity grid 
than indicated in its latest approved commercial trade schedule and has a positive sign in this 
document. Vice versa for a BRP shortage: this means that the BRP injects less electric energy, or 
withdraws more electric energy from the electricity grid than indicated in its latest approved 
commercial trade schedule and has a negative sign in this document. 
 
11 For more information, see the Bidding for Regulating and Reserve Power Manual on www.tennet.eu. 
12 COMMISSION REGULATION (EU) 2017/1485 establishing a guideline on electricity transmission system operation. 
13 COMMISSION REGULATION (EU) 2017/2195 establishing a guideline on electricity balancing. 

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 10 of 18 
 
 
Figure 2. Sign convention of volumes (Q) in imbalance pricing system 
• Positive prices for upward regulation result in a financial flow to the BSP (TenneT pays), negative 
prices result in a financial flow to TenneT (the BSP pays). Vice versa for downward regulation: 
positive prices for downward regulation result in a financial flow to TenneT (the BSP pays), negative 
prices result in a financial flow to the BSP (TenneT pays). 
  
+ -
BSP FRR up FRR down
BRP BRP surplus BRP shortage
MWh
0
(𝑄𝑄𝑑𝑑𝑑𝑑𝑑𝑑𝑑𝑑 )
(𝑄𝑄𝐵𝐵𝐵𝐵𝐵𝐵𝑠𝑠ℎ𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜 )
(𝑄𝑄𝑢𝑢𝑢𝑢 )
(𝑄𝑄𝐵𝐵𝐵𝐵𝐵𝐵𝑠𝑠𝑠𝑠𝑜𝑜𝑠𝑠𝑠𝑠𝑠𝑠𝑠𝑠 )

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 11 of 18 
 
4.2 Price mechanism for balancing energy  
To determine the balancing energy price, a uniform price, or ‘marginal pricing’ is used. This means that the 
balancing energy price per MWh per ISP per direction is the same for all delivered balancing energy and is 
equal to the highest or lowest relevant bid price, or price for mFRRda. Specifically:  
 
• The price for upward regulation is equal to the price of the highest price activated aFRR bid in 
upward direction in that ISP, or, if it is higher, the price for upward incident reserve in the ISP.  
• The price for downward regulation is equal to the price of the lowest price activated aFRR bid in 
downward direction in that ISP, or, if it is lower, the price for downward incident reserve in the ISP. 
This price can be negative. 
• If no price for upward or downward regulation is available, the volume to be allocated to suppliers for 
maintaining balance per ISP per direction is settled at the upward or downward regulation price of 
the previous ISP 
• The CBMP determined by the PICASSO platform is not explicitly taken into account in the price 
determination.
14 
 
Per ISP, the BSP receives from or pays to TenneT, the activated upward or downward regulation volume 
(energy), multiplied by the applicable balancing energy price for upward or downward regulation, 
respectively. This means that BSPs for activated aFRR and mFRRda are given the same price per energy 
volume per ISP. 
 
The application of marginal price setting based on the merit order for upward and downward regulation is 
illustrated in Figure 3. The upward regulation bids are sorted from low to high on the right -hand side. The 
downward regulation bids are sorted from high to low on the left-hand side. Sorted, these bids form the so-
called merit order(s) for upward and downward regulation.   
 
 
14 See also https://zoek.officielebekendmakingen.nl/stcrt-2024-29868.html 

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 12 of 18 
 
 
 
Figure 3. Marginal price setting based on the merit order for upward and downward regulation. 
In addition to the balancing energy price for upward and downward regulation, the mid-price is also 
determined. The mid-price is the average of the lowest price of upward bids and the highest price of 
downward bids on the merit order. The mid-price is used for two specific cases regarding imbalance price 
setting: 
• In the event that TenneT has not activated any balancing energy, i.e. regulation state 0, and thus no 
balancing energy price exists.15 This can be the case when BRPs deviate from their commercial 
trade schedule, but this does not lead to a power imbalance (for example, through ‘imbalance 
netting’ with other TSOs). Also when the Load Frequency Control is not active (for instance, because 
of a malfunction or blackout), the regulation state is 0 and the mid-price is used. 
• During regulation state 2, when the balancing energy price for upward regulation is lower than the 
mid-price, or the balancing energy price for downward regulation is higher than the mid- price. This 
situation is also known as ‘reverse pricing’. 
4.3 Regulation states 
The regulation state is a parameter that is used to determine the imbalance price of an ISP. The four 
regulation states 0, +1, -1 and 2 describe various activation situations of FRR by TenneT per ISP: 
 
15 See section 4.3 for an explanation of the various regulation states. 
← downward bids  upward bids →
↑ ↑
€/MWh €/MWh
upward regulation price 
mid price
downward regulation price
merit order
← MW →
Positive price:
BSP pays TenneT
Negative price:
TenneT pays BSP
merrit order price
Positiveprice:
TenneT pays BSP
Negativeprice:
BSP pays TenneT

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 13 of 18 
 
• Regulation state 0 applies to a situation in which TenneT does not regulate upward or downward 
during an ISP.  
• Regulation state +1 applies to a situation in which TenneT only regulates upward during an ISP.  
• Regulation state -1 applies to a situation in which TenneT only regulates downward during an ISP.  
• In a situation in which both upward and downward regulation take place within an ISP, the 
development of the series of balance deltas16 within the ISP determine the regulation state: 
o If the series of balance deltas within the ISP continuously increases or is constant, then 
regulation state +1 applies;  
o If the series of balance deltas within the ISP continuously decreases or is constant, then 
regulation state -1 applies;  
o If the series of balance deltas within the ISP both increases and decreases, then regulation 
state 2 applies.  
 
There is no direct impact of participation in IGCC or PICASSO on the regulation state. Participation in these 
platforms will change the power imbalance in the Netherlands. The remaining power imbalance will be 
solved with bids of the local merit order list, and the regulation state is determined on the basis of these 
activations. This means there can be an indirect effect on the regulation state: 
 
• As a result of participation in IGCC the power imbalance can state such that for example regulation 
state 0 will apply because no local bids need to be activated; a Dutch shortage can for instance be 
fully netted when the other participants have a surplus. 
• As a result of participation in PICASSO a Dutch shortage can for example change into a surplus , 
when the other participants have a surplus, or vice versa. 
 
 
 
 
16 The balance delta is the power of the activated upward bids, minus the power of the activated downward bids. The balance delta table 
(www.tennet.eu) shows the quantities of regulating and reserve capacity TenneT has requested for its operations. It shows these 
quantities, approximately halfway each minute, together with the prices of the pricesetting bids.  

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 14 of 18 
 
5. Imbalance price: how is the imbalance price determined? 
The imbalance price per ISP is determined by the balancing energy price for FRR in the relevant ISP. These 
prices are linked to each other in order to give the right incentives to the market (see section 3.3 ).  
 
In the Netherlands, we have two imbalance prices: an imbalance price for BRP surplus and one for BRP 
shortage. The regulation state of a system determines whether the imbalance price for BRP surplus and 
BRP shortage is the same for an ISP, or has two different values. Roughly it can be stated that when a 
regulation state of 0, 1 or -1 applies during an ISP, the imbalance price for a BRP surplus is equal to that of a 
BRP shortage. When regulation state 2 applies within an ISP, these imbalance prices differ from each other.  
 
The definition of the regulation state is explained in the previous section. Table 2 below states the imbalance 
price to be settled per ISP, i.e. for each regulation state and imbalance position (BRP shortage or BRP 
surplus). A positive imbalance price is indicated by (+); a negative imbalance price by (-). The final column 
presents the associated direction of payment.  
Note that during regulation state 2, the mid-price applies if reverse pricing takes place. 
 
 
 

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 15 of 18 
 
Table 2. Imbalance price and direction of payment (per ISP) per regulation state and imbalance position. The 
direction of payment (whether the TSO pays the BRP or the TSO receives payment from the BRP) depends on 
the imbalance position of the BRP (shortage or surplus) and the sign of the imbalance price (positive or 
negative).  
The table uses abbreviations for the various prices: balancing energy price for upward regulation (Pup); 
balancing energy price for downward regulation (Pdown) and mid-price (Pmid).  
During ISP with Imbalance position BRP Imbalance price Direction of payment 
Regulation state 0 
BRP shortage  Pmid (+) BRP  TSO 
Pmid (-) TSO  BRP 
BRP surplus Pmid (+) TSO  BRP 
Pmid (-) BRP  TSO 
 
During ISP with Imbalance position BRP Imbalance price Direction of payment 
Regulation state +1 
BRP shortage  Pup (+) BRP  TSO 
Pup (-) TSO  BRP 
BRP surplus Pup (+) TSO  BRP 
Pup (-) BRP  TSO 
 
During ISP with Imbalance position BRP Imbalance price Direction of payment 
Regulation state -1 
BRP shortage  Pdown (+)  BRP  TSO 
Pdown (-)  TSO  BRP 
BRP surplus Pdown (+) TSO  BRP 
Pdown (-)  BRP  TSO 
 
During ISP with Imbalance position BRP Imbalance price Direction of payment 
Regulation state 2 
BRP shortage  
 
Pup ≥ Pmid 
Pup (+) BRP  TSO 
Pup (-) TSO  BRP 
Pup < Pmid Pmid (+) BRP  TSO 
Pmid (-) TSO  BRP 
BRP surplus  
Pdown ≤ Pmid 
Pdown (+) TSO  BRP 
Pdown (-) BRP  TSO 
Pdown > Pmid 
  
Pmid (+) TSO  BRP 
Pmid (-) BRP  TSO 
 
  

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 16 of 18 
 
6. Financial residue at TenneT 
TenneT’s settlement with various (market) parties has financial consequences for TenneT’s operating 
expenses, referred to as 'financial residue'. The domestic financial residue is the result of TenneT’s 
settlement of energy (balancing energy and imbalance) per ISP. The settlement of TenneT’s energy with 
other TSOs, based on both intended and unintended exchanges of energy with other TSOs, also contributes 
to the financial residue. The final financial residue is determined by combining the domestic residue with the 
residues of energy settlements with other TSOs.  
 
The costs of contracting balancing capacity to meet the dimensioning requirements, as agreed with the other 
TSOs, do not contribute to the financial residue but are included in the regulated tariffs. 
 
The payments that contribute to the financial residue are presented in Figure 4. 
 
 
 
Figure 4. Components that contribute to the financial residue at TenneT 
  


 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 17 of 18 
 
6.1 Volumes and costs 
The domestic balance is determined individually per ISP and is obtained as follows:  
 
�(𝑄𝑄𝑑𝑑𝑑𝑑𝑑𝑑𝑑𝑑 ∙ 𝑃𝑃𝑑𝑑𝑑𝑑𝑑𝑑𝑑𝑑 )
𝐵𝐵𝐵𝐵𝐵𝐵
+ � �𝑄𝑄𝐵𝐵𝐵𝐵𝐵𝐵𝑠𝑠ℎ𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜 ∙ 𝐼𝐼𝑃𝑃𝑠𝑠ℎ𝑑𝑑𝑜𝑜𝑜𝑜 �
𝐵𝐵𝐵𝐵𝐵𝐵
 
− ���𝑄𝑄𝑢𝑢𝑢𝑢 ∙ 𝑃𝑃𝑢𝑢𝑢𝑢�
𝐵𝐵𝐵𝐵𝐵𝐵
+ � �𝑄𝑄𝐵𝐵𝐵𝐵𝐵𝐵𝑠𝑠𝑠𝑠𝑜𝑜𝑠𝑠𝑠𝑠𝑠𝑠𝑠𝑠 ∙ 𝐼𝐼𝑃𝑃𝑙𝑙𝑑𝑑𝑑𝑑𝑙𝑙�
𝐵𝐵𝐵𝐵𝐵𝐵
�. 
 
In this formula, 𝑄𝑄 represents the volumes for upward regulation and downward regulation (𝑄𝑄𝑢𝑢𝑢𝑢 and 𝑄𝑄𝑑𝑑𝑑𝑑𝑑𝑑𝑑𝑑, 
respectively) and for a surplus or a shortage at the BRP (𝑄𝑄𝐵𝐵𝐵𝐵𝐵𝐵𝑠𝑠𝑠𝑠𝑜𝑜𝑠𝑠𝑠𝑠𝑠𝑠𝑠𝑠  and 𝑄𝑄𝐵𝐵𝐵𝐵𝐵𝐵𝑠𝑠ℎ𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜𝑜 , respectively). 
Furthermore, 𝑃𝑃 is the balancing energy price for upward and downward regulation ( 𝑃𝑃𝑢𝑢𝑢𝑢 and 𝑃𝑃𝑑𝑑𝑑𝑑𝑑𝑑𝑑𝑑, 
respectively) and 𝐼𝐼𝑃𝑃 the imbalance price that is settled with the BRP per volume when it has a surplus or a 
shortage (𝐼𝐼𝑃𝑃𝑙𝑙𝑑𝑑𝑑𝑑𝑙𝑙 and 𝐼𝐼𝑃𝑃𝑠𝑠ℎ𝑑𝑑𝑜𝑜𝑜𝑜, respectively).  
 
The financial residue is caused by a difference in volume of balancing energy compared with imbalance 
energy and/or by a difference between balancing energy price and imbalance price. The financial residue 
mainly originates from the following situations:  
 
Related to price: 
• During regulation state 2, the imbalance price can be the same as the mid-price. The difference 
between the balancing energy price and the imbalance price results in a balance unequal to €0;  
• By using Imbalance Netting (TenneT forms part of the Imbalance Netting cooperation IGCC 17), 
aFRR activations for upward or downward regulation are avoided. These avoided aFRR volumes are 
settled between the TSOs at a price that is per definition more favourable or equal to the balancing 
energy price for the relevant direction and ISP. The imbalance of BRPs in the relevant ISPs is, 
however, settled at the imbalance price. This can create a difference between the IGCC price and 
the imbalance price, which creates a balance. 
• Exchange between TSOs through PICASSO is settled at the CBMP (cross-border marginal price) of 
the PICASSO platform. This is a price per 4 seconds. Local activations as a result of this exchange 
will be settled with BSPs at the marginal price per 15 minutes.  
 
Related to volumes: 
• During regulation state -1, the activated volume for upward regulation is ≠ 0, or during regulation 
state +1 the activated volume for downward regulation is ≠ 0 because of the deactivation of 
previously activated bids. 
• There is a delay between the occurrence of a power balance interruption and the start of the power 
restoration action (no more than 30 seconds). 
• There is a time interval between the start of the power balance restoration action by the TSO and the 
actual power balance restoration (not longer than 15 minutes). 
 
17 In accordance with EB GL. 

 
 
 
Imbalance Pricing System: how are the (directions of) payment determined?  
 
 
 
 TenneT TSO B.V. 
PAGE 18 of 18 
 
• If the market parties do not supply the correct FRR energy volumes as activated by the TSO. 
6.2 Relationship with the regulated tariffs 
The financial residue from the settlement of TenneT transactions, as described in the previous section, is  
annually accounted for in the next year’s tariffs.18,19 This means that TenneT has no stake in the financial 
residue of the balancing process, since a positive (and negative) financial residue is returned to all tariff 
payers. 
 
A separate system service tariff does no longer exist since 1 January 2015. The Dutch Consumer & Market 
Authority (ACM) has since combined the permitted tariff incomes for system tasks and the permitted tariff 
incomes for transport tasks. The tariff incomes – and thus also the financial residue from settlement of the 
balancing process – are included in a combined tariff for system and transport tasks.  
 
In determining TenneT’s permitted tariff incomes for system tasks, ACM has determined three types of costs: 
"beheerkosten", "inkoopkosten" and "uitvoeringskosten".20 The settlement of TenneT for balancing falls 
under the "inkoopkosten" entry, which ACM defines as: ‘the costs that TenneT incurs for the power and 
services made available by third parties’. Additionally, ACM states that the "inkoopkosten" are equal to ‘the 
balance of the realised costs and returns’. This means that ACM corrects the budget for the purchase of 
energy and power for the system services with the previous year’s financial residue. 21  
 
The annual estimate of the purchasing costs takes place on the basis of a rolling forward system, i.e. based 
on the actual costs from two years previously (t-2), corrected for inflation and a parameter for dynamic 
efficiency that is determined by ACM.22 The "beheerkosten", "inkoopkosten" (including a correction for the 
financial residue), "uitvoeringskosten" and any retroactive settlement, together form the permitted tariff 
incomes for TSO's system tasks.23  
 
18 See article 10.29.3 from the Netcode Elektriciteit and point 120 in the "Methodebesluit Systeemtaken TenneT 2017-2021" (only 
available in Dutch). 
19 TenneT includes the imbalance balance until 1 September from year t-1 in the tariff proposal for the year t. 
20 See Chapter 8 of the "Methodebesluit Systeemtaken TenneT 2017-2021" (only available in Dutch). 
21 See formula (9) in Appendix 1 of the "Methodebesluit Systeemtaken TenneT 2017-2021" (only available in Dutch). 
22 See formula (8) in Appendix 1 of the "Methodebesluit Systeemtaken TenneT 2017-2021" (only available in Dutch). 
23 See formula (13) in Appendix 1 of the "Methodebesluit Systeemtaken TenneT 2017-2021" (only available in Dutch).
