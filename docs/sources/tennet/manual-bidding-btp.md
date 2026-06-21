<!-- Source: https://tennet-drupal.s3.eu-central-1.amazonaws.com/default/2026-05/Manual%20Bidding%20BTP.pdf
     Retrieved: 2026-06-21 (PDF, text extracted) -->

# manual-bidding-btp

Source PDF: https://tennet-drupal.s3.eu-central-1.amazonaws.com/default/2026-05/Manual%20Bidding%20BTP.pdf
Local copy: files/Manual Bidding BTP.pdf

---

CLASSIFICATION C1 - Public Information 
VERSION DATE 18 May 2026 
PAGE 1 of 9 
 
 
 
Manual Bidding of Balancing- and Transport Power  
 
 
 
 
 
Manual Bidding  of Balancing- and Transport Power, version 5 
 
 
 
 
 

 
 
 
Manual Bidding  of Balancing- and Transport Power, version 5 
 
 
 
 TenneT TSO B.V. 
DATE 18 may 2026 
PAGE 2 of 9 
 
 
 
Amendments to Register: 
 
 
Version number Date Amendment 
0.1 18 September 2000 Initial version 
0.2 27 September 2000 Incorporation of project members’ comments 
Incorporation of new version of MIG QUOTES 0.5 
0.3 20 October 2000 - Workshop version 
- Incorporation of definitive version of MIG QUOTES 1.0 
1.0 04 December 2000 - Definitive version 
- Adjustment of permissible values for object of 
regulation and dispatch time 
- Amendment of closing term as at day of delivery 
1.1 12 December 2001 Revision of objects of regulation and update of handbook 
1.2 12 May 2003 Changes to chapter 2 (PTU adjustment) 
2.0 June 2010 Adaptation to UTIL TS, Blockbids 
2.1 February 2011 Adjustment limits Blockbids 
2.2 25 May 2012 Adjustment Gate Closure Time 
2.3 November 2017 Adjustment Power 
2.4 January 2018 Adjustment Gate Closure Time 
3.0 January 2019 Update lay-out, 
Adjusted content in accordance with the amendment of 
'Netcode Elektriciteit'  (ACM/18/032994) 
4.0 January 2020 Obligation contract number aFRR changed to optional  
4.1 May 2021 Removal freeze period day of preparation 
5 16 March 2022 Removal mFRRsa 
Change Ramping rate 
5.1 5 July 2024 Update location field 
5.2 18 May 2026 Update ramp rate 200% 
 
    
 
 
 
 

 
 
 
Manual Bidding  of Balancing- and Transport Power, version 5 
 
 
 
 TenneT TSO B.V. 
DATE 18 may 2026 
PAGE 3 of 9 
 
1.  Introduction 
This document contains instructions for submitting bids balancing- and transport power (BTP)1 to TenneT 
TSO, as guideline for BSPs2 and CSPs3. Topics that will be discussed in this document are the attributes of 
the bid (significance, permissible values), the timetable and the transitions from summer to winter time.  
 
Further information on balancing and transport power can be found in the 'Netcode Elektriciteit', the 
Implementation Rules and the product information documents on www.tennet.eu. In case of differences 
between the texts, the text of the 'Netcode Elektriciteit' prevails. If the topic is not described in the 'Netcode 
Elektriciteit' the text of the Implementation Rules shall prevail. 
 
BTV bids are options, whereby TenneT is obligated, after activation, to:  
- calculate a certain volume based on the characteristics of bidding and activation  
- settle this volume with the BSP or CSP on at least its financial terms.  
adjust this volume on the imbalance of the BRP behind the activated allocation points 
The BSP/CSP is responsible for meeting the bidding requirements; incorrect bids will be rejected by TenneT.  
TenneT is responsible for timely activation, and respecting the bidders minimum requirements with respect 
to the preparation period
4 and the delivery period5. 
TenneT is responsible for correct settlement of activated bids and ensuing adjustment of i mbalances. The 
BSP/CSP is responsible for the delivery of the energy, corresponding to the bid activated by TenneT, during 
the delivery period.  
Note that any reference to a time of day shall be CET. 
1.1  Categories bids balancing- and transport power 
All bids BTP belong to one of the following: 
1. Balancing purposes: 
a. Bids aFRR6, preparation period = 0, delivery period = 1 
2. Other purposes  
a. Bids Reserve power, preparation period ≥ 3, delivery period ≥ 4 
 
As the requirements for bid messages are similar for aFRRand Reserve power other purposes, this manual 
will use the generic term BTP. 
 
 
1 BTP includes aFRR, mFRRsa and Reserve power other purposes. 
2 BSP: Balancing Service Provider 
3 CSP; Transport Service Provider 
4 Preparation period was previously known as Activation time 
5 Delivery period was previously known as Activation duration 
6 Automatic Frequency Restoration Reserve; previously known as regulating power  

 
 
 
Manual Bidding  of Balancing- and Transport Power, version 5 
 
 
 
 TenneT TSO B.V. 
DATE 18 may 2026 
PAGE 4 of 9 
 
2. Structure of BTP message 
The diagram below shows the structure of the messages of BTP submitted by the BSP/ CSP: 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
The BTP message is made up of a combination of BTP bids, whose number per BTP message is unlimited 
(n).  
A BTP message with number of BTP bids nil (0) indicates the BSP/CSP does not want to submit BTP 
Each new BTP message sent overrides all previous BTP messages. 
 
The BTP messages are exchanged in a standardised format, in compliance with the EDI standard for the 
Dutch energy sector (EDINE).  
A detailed description of this format is available at MijnEDSN at www.edsn.nl  
The BTP message is sent to the CPS, the central mailbox system, and should be addressed to TenneT/SO.  
 
Each bid BTP is composed of bidding lines, one for each ISP
7 (clock quarter of an hour). 
Any standard day counts 96 ISPs. On days with transitions to and from daylight savings time there are 92 or 
100 bidding lines. (See also chapter 4) 
 
Number of positions and character (numeric, alphanumeric, …) of the attributes are defined in the UN/Cefact 
UNSM (in this case UTILTS). An exception is Data Element C506.1154 in the RFF-segment: the number of 
positions for this Data Element in the messages defined in this document is an..35 instead of the standard 
 
 
BTP message 
BTP bid 
BTP bid line 
0..n 
92..100 

 
 
 
Manual Bidding  of Balancing- and Transport Power, version 5 
 
 
 
 TenneT TSO B.V. 
DATE 18 may 2026 
PAGE 5 of 9 
 
an..70 specified in the UNSM.  
2.1 Attributes of BTP message 
 
The BSP/CSP is required to confer values upon the following attributes in its BTP message: 
Attribute Unit Description Permissible values 
BSP/CSP N/A Identification of the supplier of 
balancing- and/or transport 
power 
EAN code 
BRP N/A Identification of the BRP 
(Balance Responsible Party) 
whose imbalance will be adjusted  
upon activation of transport 
power.  
In case of aFRR the BRP 
information is send via an 
additional information stream 
EAN code 
aFRR: This has to be the EAN-
code of the BSP itself. The BRP 
information is send via an 
additional information stream. 
Request  N/A If the message is submitted at 
TenneT’s request, the TenneT-
issued request number must be 
included 
TenneT-issued request number 
Date of delivery N/A The date for which the bids relate Date in the range8 current and 
current + 7 days 
 
  
 
8 Inclusive threshold values 

 
 
 
Manual Bidding  of Balancing- and Transport Power, version 5 
 
 
 
 TenneT TSO B.V. 
DATE 18 may 2026 
PAGE 6 of 9 
 
2.2 Attributes of BTP bid 
Each bid in the BTP message is specified through the following attributes: 
Attribute Unit Description Permissible values 
Contract N/A Identification of the contract between the 
BSP/CSP and TenneT 
TenneT-issued contract number comprising 
10 alphanumerical characters 
Reference N/A BSP/CSP-issued unique identification of 
the bid as part of the message  
BSP/CSPs choice 
Object  N/A An object enables a BSP/CSP to couple 
two bids. From an Object only one bid can 
be activated. See notes below the table. 
BSP/CSPs choice 
Preparation 
period 
ISP ISP interval relative to current for which 
Bid is available to be activated by TenneT; 
distinguishes aFRR and Reserve power 
other purposes  
Integer value 0 for aFRR or in the range8 3 
to 672 (7 days) for Reserve power other 
purposes 
Delivery period ISP Minimum number of consecutive ISPs for 
admissible activation by TenneT; 
distinguishes aFRR and Reserve power 
other purposes 
Integer value 1 for aFRR or in the range8 4 
to 672 range (7 days)  for Reserve power 
other purposes 
Power MW Quantity 
+ upward 
- downward 
Upward: Integer in range8 19 to 999 
Downward: Integer in range8 -19  to -999 
Ramping rate % per 
minute 
Ramping rate, as percentage of bid 
quantity per minute 
One decimal place, value in the range8 20.0 
to 200.0 
Location/Grid 
object 
N/A A connection, or set of connections, within 
the Dutch high-voltage grid, from which 
bidder will dispatch on activation. This 
connection or set of connections belongs 
to one owner or administrator. For aFRR it 
refers to the LFC area NL. 
EAN code 
 
 
Note: 
• A aFRR object couples two bids of opposite sign (upward/downward) 
• A Reserve power object other purposes couples two bids with similar quantity and preparation period, but 
with different delivery period and price. 
 
9 A message is only allowed to contain 3 bids with a size smaller than 4 MW 

 
 
 
Manual Bidding  of Balancing- and Transport Power, version 5 
 
 
 
 TenneT TSO B.V. 
DATE 18 may 2026 
PAGE 7 of 9 
 
2.3 Attributes of BTP bid line 
Each ISP on the date of delivery for which the bid is available must be specified.  
Attribute Unit Description Permissible values 
Availability ISP ISP number for which bid applies Unique Integer value in range8 1 
to 100, ascending 
Bid price €/MWh Energy price  Two decimal places 
Value in the range8 –100,000.00 
to +100,000.00  
Note: 
• For bids FRR the bid price may vary per ISP; for bids for other purposes the bid price must be constant.  
• The sign of the product of the quantity and the settlement price denotes the direction of the cash flow, 
with + indicating that that pays the BSP/CSP and -, that the BSP/CSP that pays TenneT. 
 
 Bid price > 0 Deployment Bid price < 0 
Power >0 (upward) TenneT pays BSP/CSP BSP/CSP pays TenneT 
Power < 0 (downward) BSP/CSP pays TenneT TenneT pays BSP/CSP 
• € 1.23/MWh = € 0.00123/kWh  
 
2.4 Optional and mandatory aspects of attributes 
As the table below shows, the attributes of the message, the bid and the bidding line are either mandatory or 
optional depending on the category of BTP bid: 
Attribute aFRR 
 
Reserve power 
other purposes 
BSP/CSP Mandatory Mandatory 
BRP Mandatory Mandatory 
Request Optional Optional 
Date of delivery Mandatory Mandatory 
Contract N/A N/A 
ID Mandatory Mandatory 
Object  Optional Optional 
Preparation 
period 
Mandatory Mandatory 
Delivery period Mandatory Mandatory 
Ramping rate Mandatory N/A 
Location Mandatory Mandatory 
Power Mandatory Mandatory 
Bid price Mandatory Mandatory 

 
 
 
Manual Bidding  of Balancing- and Transport Power, version 5 
 
 
 
 TenneT TSO B.V. 
DATE 18 may 2026 
PAGE 8 of 9 
 
Note: 
• Mandatory implies that a value must be specified, in accordance with admissible or prescribed 
values in 2.2, 2.3 and 2.4 
• Optional implies that a value may be specified, in accordance with admissible values in 2.2, 2.3 and 
2.4 
• N/A implies that no value is allowed to be specified. 
 
3. Timetable 
The BTP messages are required to be sent in accordance with a fixed timetable so as to enable TenneT’s 
timely processing of the bids. Time of receipt in the CPS (central mailbox system) is deciding.  
 
3.1 Day of preparation (D-1) 
The BTP bids for which there is a capacity contract for the day of delivery are required to reach TenneT by 
14.45 CET daily on the day prior to that of delivery.  
3.2 Day of delivery 
On the day of delivery, the deadline for submitting revised BTP bids always closes 30 minutes ahead of each 
ISP.  
Example: 
 
4. Transition to and from daylight savings time 
On the day of transition from summer (i.e. daylight saving) to winter time (clock put back at 3.00 a.m.), four 
additional bidding lines are required to be provided in respect to the third hour. This implies for those 
BSP/CSPs which compile their bids using Excel templates that all bidding lines relating to the fourth and 
further hours are put back four rows. 
 
A similar mechanism applies on the day of transition from winter to summer time (clock put forward at 
2.00 a.m.). Here there are no bidding lines for the third hour, which implies that all bidding lines relating to 
the fourth and further hours are moved up four lines. 
It is 19.12 CET and a BSP/CSP decides to revise its BTP bids for the current day. At this time the BSP/CSP 
will be permitted to submit changes for the ISP from 19.45 to 20.00 CET and all further ISPs. In the event of 
the BSP/CSP having changed one or more ISPs preceding that from 19.45 to 20.00 CET, all its BTP bids will 
be rejected. 

 
 
 
Manual Bidding  of Balancing- and Transport Power, version 5 
 
 
 
 TenneT TSO B.V. 
DATE 18 may 2026 
PAGE 9 of 9 
 
In the following examples the periods that deviate from a 'normal day' are marked.  
Transition from summer to 
winter time 
(100 bidding lines) 
 Transition from winter to 
summer time  
(92 bidding lines) 
Period  
(Excel) 
Clock hour 
 
 Period 
 (Excel) 
Clock hour 
 
.... ....  .... .... 
01:30 - 01:45 01:30 - 01:45  01:30 - 01:45 01:30 - 01:45 
01:45 - 02:00 01:45 - 02:00  01:45 - 02:00 01:45 - 02:00 
02:00 - 02:15 02:00 - 02:15  02:00 - 02:15 03:00 - 03:15 
02:15 - 02:30 02:15 - 02:30  02:15 - 02:30 03:15 - 03:30 
02:30 - 02:45 02:30 - 02:45  .... .... 
02:45 - 03:00 02:45 - 03:00  .... .... 
03:00 - 03:15 02:00 - 02:15  22:15 - 22:30 23:15 - 23:30 
03:15 - 03:30 02:15 - 02:30  22:30 - 22:45 23:30 - 23:45 
03:30 - 03:45 02:30 - 02:45  22:45 - 23:00 23:45 - 24:00 
03:45 - 04:00 02:45 - 03:00  23:00 - 23:15 N/A 
04:00 - 04:15 03:00 - 03:15  23:15 - 23:30 N/A 
.... ....  23:30 - 23:35 N/A 
.... ....  23:45 - 24:00 N/A 
24:00 - 24:15 23:00 - 23:15  24:00 - 24:15 N/A 
24:15 - 24:30 23:15 - 23:30  24:15 - 24:30 N/A 
24:30 - 24:45 23:30 - 23:45  24:30 - 24:45 N/A 
24:45 - 25:00 23:45 - 24:00  24:45 - 25:00 N/A
