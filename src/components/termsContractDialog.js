import { Button, Checkbox, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel } from '@material-ui/core';
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function TermsContractDialog({open, toggleDialog, handleConfirmation}) {
    const [ termsChecked, setTermsChecked ] = React.useState(false)
    const handleConfirm = () => {
        handleConfirmation()
        toggleDialog()
    }
    return (
        <Dialog
            open={open}
            onClose={() => toggleDialog()}
            >
            <DialogTitle>Terms & Conditions</DialogTitle>
            <DialogContent>
                <DialogContentText component="div">
                <div id="form-content">
                    <div id="form-logo-container"><img src={require('../assets/images/logo.png')} alt="Property Leads" /></div>
                    <div id="form-header">Terms of Use and End Users License Agreement</div>
                    <p>
                        NOTICE TO ALL USERS: CAREFULLY READ THE FOLLOWING LEGAL AGREEMENT<br />
                        Terms of Use and End Users License Agreement ("Terms of Use")
                    </p>
                    <p>
                        The following software and subscription services are being provided to you by EquiMine Inc. ("EquiMine"). As such, by agreeing to access such software and services, the end user ("Client") hereby agrees to abide by the terms and conditions outlined below vis a vis Client and EquiMine in addition to any terms and conditions agreed to by and between EquiMine and Client pursuant to a previously entered into Student Purchase Agreement ("Agreement").
                    </p>
                    <p>
                        By subscribing to EquiMine you become a Client of EquiMine. EquiMine offers services to you, the Client, conditioned on your agreement to adhere to the following Terms of Use without modification or reservation of any kind.
                    </p>
                    <p>
                        Client's agreement with EquiMine and/or use of EquiMine's services constitutes Client's unconditional acceptance to these Terms of Use. These Terms of Use are subject to change by EquiMine, in its sole discretion, at any time, without prior notice by posting upon its web site.
                    </p>
                    <p>
                        Client understands that Client will be billed a monthly subscription fee as outlined in the signup process along with any upgrades, enhancements, or fee based services that Client may agree to within the Service or from the order page on EquiMine's website, or that of its affiliates, until Client cancels Client's subscription. Client may cancel at any time by contacting customer support at 877-204-9040.
                    </p>
                    <p>
                        Based upon the Client's agreement to adhere to, and fully comply with, these Terms of Use, EquiMine grants and conveys to the Client, during the term of Client's valid subscription, a non-exclusive, non-transferable license to use the data, information and services provided through the EquiMine website subject to the License Restrictions set forth hereafter.
                    </p>
                    <p>
                        License Restrictions<br />
                        Client represents, warrants, affirms and agrees that the data, information and services provided by EquiMine to Client will only be used by Client and that Client will not permit or allow the data, information and services to be used by any agent, representative, consultant, officer, director, shareholder, parent organization, subsidiary organization, third party or any other person or entity unless Client has the appropriate subscription allowing such expanded use. Client further represents, warrants, affirms and agrees that Client will not transfer, sell, convey, use, resell or sublicense any data, information or services provided by EquiMine to Client in any medium, form, manner or format whatsoever, for any purpose including, but not limited to the following:
                    </p>
                    <p>
                        1. Use other than Client's own personal use, i.e. no commercial purpose or use, or use of Client's account by others is permitted;<br />
                        2. Reproduction, reformatting, publication, distribution or dissemination associated with any service or product provided or made available to any third party;<br />
                        3. Marketing or telemarketing uses;<br />
                        4. World Wide Web, Internet or online uses;<br />
                        5. Real estate valuation models, programs or systems;<br />
                        6. Inclusion or in combination with any other service or product of any kind;<br />
                        7. Extracting, selecting or drawing out any data element for any use;<br />
                        8. Real estate appraisal;<br />
                        9. Credit evaluation and/or supporting;<br />
                        10. Evaluating risk, marketing sale of insurance products of any kind, including but not limited to life, health, long-term care, disability, casualty, umbrella, mortgage, title or property;<br />
                        11. Debt collection; and<br />
                        12. Marketing or sale of legal goods and/or services of any kind, including but not limited to bankruptcy or real estate title/lien history unless Client has the appropriate subscription allowing such expanded use.
                    </p>
                    <p>
                        Team Accounts<br />
                        Team Accounts may only be used by Team Members and each Team Member must agree to Terms of Use &amp; End User License agreement before being granted access. Team Members are limited to designated individuals who have a bona fide relationship with the business that holds the Primary Account and have a legitimate business need to access and use EquiMine's services in connection with the business that holds the Team Account.   Team Members must be either employees, or direct consultants or contractors of the Primary Account Holder. A Team Member may not use the Service to find, evaluate, contact investments or listing opportunities for their own personal uses or for any business other than that of the Primary Account Holder. The solicitation or acceptance of money, or anything else of value, by the Primary Account holder in exchange for granting access to EquiMine's services to a Team Member is strictly prohibited and will result in the immediate termination of the Account and may subject Account Holder(s) to additional damages as permitted by law. 
                    </p>
                    <p>
                        Proprietary Rights<br />
                        Client represents, warrants, affirms and agrees that the data, information, services and EquiMine name are proprietary information and property of EquiMine, its suppliers and/or affiliates and are protected by copyright, trademark, trade name and other proprietary rights. Client's license only allows Client to use the data, information and services subject to the express limitations and restrictions provided for in these Terms of Use during the term of Client's valid subscription.
                    </p>
                    <p>
                        Consequences of Non-Compliance with Terms of Use<br />
                        At any time that EquiMine believes, in its sole discretion, that Client has violated any term, condition, restriction, permitted use or limitation provided in these Terms of Use, EquiMine may immediately terminate Client's license and Client's sole remedy shall be to receive a pro-rata refund of the monthly subscription/license fee paid by Client for the remaining days of the then-current month of prepaid fees.
                    </p>
                    <p>
                        Terms of Subscription<br />
                        The term of Client's subscription is one month, but automatically renews month-to-month unless terminated by Client or EquiMine.
                    </p>
                    <p>
                        Termination<br />
                        EquiMine reserves the right to cancel subscription services and this license to Client at any time for any, or no reason whatsoever, without recourse to Client beyond a pro-rata refund of the monthly subscription/license fee paid by Client for the remaining days of the then current month of prepaid fees.
                    </p>
                    <p>
                        The Client may cancel the Client's subscriptions at any time. All fees due to EquiMine up to the end of the then-current monthly billing cycle at time of termination shall remain payable to EquiMine.
                    </p>
                    <p>
                        The Client may terminate contract any one of three ways:<br />
                        1. By e-mailing a cancellation request to <a href="mailto:support@propstream.com">support@propstream.com</a> prior to the next billing cycle date and providing Client's account number.<br />
                        2. By contacting Customer Support at 877-204-9040 prior to next billing cycle date.<br />
                        3. By mailing a cancellation request at least ten (10) days prior to the desired cancellation date to: EquiMine ATTN: Cancellations 26457 Rancho Parkway South, Lake Forest, CA 92630
                    </p>
                    <p>
                        Survival of Terms<br />
                        The License Restrictions and Proprietary Rights described herein survive any termination of this agreement and/or Client's subscription.
                    </p>
                    <p>
                        Client Services<br />
                        Client affirms that all of the information Client provides to EquiMine, whether online or otherwise, is accurate and complete. Client also agrees to update EquiMine with current and accurate information, if at any time the information Client provided to EquiMine changes, EquiMine reserves its right to terminate or suspend access to EquiMine services to any Client whose information EquiMine believes, at EquiMine's sole discretion, to be inaccurate or misleading.
                    </p>
                    <p>
                        EquiMine may from time to time offer eligible Clients promotional opportunities. Not all Clients may be eligible to receive all promotional opportunities.
                    </p>
                    <p>
                        OTHER SERVICE PROVIDERS- NON-LIABILITY OF EQUIMINE<br />
                        From time to time EquiMine may include on its websites, software, or service, third-party service providers not associated with EquiMine, such as Skip Tracing Services, Ringless Voice Mails, E-Mail Services, and Direct Mail Services. EquiMine lists these services solely as an accommodation to its clients. EquiMine is not responsible for and makes no warranty or representation as to the quality or performance of the services offered by or through these third party service providers. It is the Client's responsibility, and EquiMine encourages this for all clients, to independently investigate the qualifications of each service provider and to carefully review each service provider's service offerings prior to entering into any engagement or transaction.  Such services are offered on an "AS-IS" basis and are subject to the limitations and disclaimers of the third party providers, which are available from the providers upon request.  EquiMine cannot and does not guarantee the outcome of the use of any such third party services.
                    </p>
                    <p>
                        EquiMine is not responsible or liable for any acts or omissions created or performed by these other Service Providers. EquiMine's websites, software, or service, may contain links to websites maintained by third-party Service Providers. Such links are provided for Client convenience and reference only.
                    </p>
                    <p>
                        EquiMine does not operate or control, in any respect, any information, software, products or services available on such websites. EquiMine 's inclusion of a link to such websites does not imply any endorsement, warranty, guarantee or recommendation of these websites, contents, products or services of the sponsoring organization.
                    </p>
                    <p>
                        Third-Party Content and Screening<br />
                        EquiMine is a data aggregator of content supplied by third parties and Clients and as such does not have editorial control over the statements, or other content provided, expressed or implied by third parties. EquiMine reserves the right, but is not obligated, to screen and review any content provided to EquiMine and remove or edit any content, if it does not comply with laws, rules or regulations, or for any other reason EquiMine deems relevant.
                    </p>
                    <p>
                        Modification of EquiMine Services<br />
                        EquiMine reserves the right to modify or discontinue any service, portion or attribute thereof, and the offering of any information with or without notice to any Client. EquiMine is not liable to any Client in the event that EquiMine exercises its right to modify or discontinue any service.
                    </p>
                    <p>
                        PAYMENT OF CHARGES<br />
                        A. EquiMine currently charges a monthly subscription fee. The monthly subscription fee is calculated from the day of the month that the Client's paid Subscription commences. The Client authorizes EquiMine to, and the Client agrees that EquiMine may, charge to the Client's credit card, debit card or bank account, in advance, the Client's regular monthly Subscription fee for each month of the Client's regular monthly Subscription on a recurring basis. The Client authorizes EquiMine to, and the Client agrees that EquiMine may, modify and/or change the monthly Subscription fee charged to the Client upon thirty (30) days' notice to the Client sent by e-mail to Client's email of record on file with EquiMine. The monthly Subscription fee is non-refundable and accrues until canceled whether or not the Client accesses the databases.
                    </p>
                    <p>
                        B. On Time Payment<br />
                        The Client is required to pay all charges on time and agrees to submit an accompanying payment authorization in connection with these charges when requested by EquiMine. Credit card transactions require an acceptable and currently working/continuously valid credit card number/account. EquiMine may terminate or disable the Client's participation in EquiMine services if the Client fails to pay fully and in a timely manner any and all amounts due to EquiMine. If the Client's credit card expires or is otherwise declined for payment, access to EquiMine services and websites can be modified or suspended without notice to the Client. EquiMine may, if necessary, extend the expiration of your credit card in order to assure continued service. If any Client payment is more than thirty (30) calendar days past due, a monthly late fee in the amount of 1.5% of the past due amount or the maximum allowable by law, whichever is less, shall accrue per month, and the entire amount of unpaid charges and/or any other outstanding balance (if any), plus this assessment, will become immediately due and payable. The Client shall pay all costs of collection, including legal fees, incurred by EquiMine. The Client is responsible for any premium charges incurred in connection with the use of information, content, goods, products or services that are provided at an extra cost. All fees are quoted and payable in United States Dollars. The Client is also responsible for paying all applicable taxes for information, content, goods, products or services and any other costs incurred in connection with the use of or access to EquiMine and EquiMine's services.
                    </p>
                    <p>
                        C. Payment Methods<br />
                        The Client's complete billing address and telephone number must be provided to process payments. EquiMine accepts major credit cards including Visa, MasterCard, Discover, and American Express and may accept bank drafts, including personal checks, money orders, cashier's checks, and company checks sent by mail. EquiMine may charge a twenty-dollar ($20.00) handling fee, or the maximum allowable by law, whichever is less, for each check returned unpaid for insufficient funds or any other reason.
                    </p>
                    <p>
                        D. Account Discrepancies<br />
                        A Client may contact EquiMine Customer Service by e-mail at <a href="mailto:support@propstream.com">support@propstream.com</a> or telephone at 877-204-9040 concerning charges or other questions regarding the status of the Client's Account. However, if the Client's account questions are not satisfactorily resolved within fifteen (15) business days of Client's calling or sending an e-mail, and in no event later than ninety (90) days after a questionable account billing or other discrepancy should have been discovered, the Client must write to the Customer Service Department, EquiMine, 26457 Rancho Parkway South Lake Forest, CA 92630, delivered by United States mail or by fax to 866-203-5201. Otherwise, any and all such Client complaints are irrevocably waived.
                    </p>
                    <p>
                        DISCLAIMERS AND LIMITATIONS<br />
                        EquiMine attempts to ensure that the information contained in its service is accurate and reliable; however, errors sometimes occur. EquiMine does not guarantee the accuracy of the information contained in this service and instructs you to independently verify the accuracy of the information provided. In addition, EquiMine may make changes and improvements to the information provided herein at any time. THE WEBSITES AND THE INFORMATION, SOFTWARE, PRODUCTS AND SERVICES ASSOCIATED WITH THEM ARE PROVIDED "AS IS." EQUIMINE,  ITS SUPPLIERS, PROFESSIONAL SERVICE PROVIDERS, THIRD-PARTY CONTENT PROVIDERS AND OTHER SERVICE PROVIDERS DISCLAIM ANY WARRANTY OF ANY KIND, WHETHER EXPRESS OR IMPLIED, AS TO ANY MATTER WHATSOEVER RELATING TO THE WEBSITES AND ANY INFORMATION, SOFTWARE, PRODUCT, GOOD AND/OR SERVICE PROVIDED THEREIN, INCLUDING WITHOUT LIMITATION THE IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NONINFRINGEMENT. BY THE CLIENT'S USE OF EQUIMINE 'S SERVICE, THE CLIENT AGREES AND ACKNOWLEDGES THAT THE CLIENT'S USE OF ALL EQUIMINE INFORMATION, SOFTWARE, PRODUCTS, GOODS AND/OR SERVICES PROVIDED IN, BY OR THROUGH EQUIMINE AND/OR ITS WEBSITES IS AT THE CLIENT'S OWN RISK. EQUIMINE AND/OR ITS SUPPLIERS AND PROVIDERS, ARE NOT LIABLE FOR ANY DIRECT, INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL OR CONSEQUENTIAL DAMAGES OR OTHER INJURY ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF EQUIMINE'S SERVICE OR WITH THE DELAY OR INABILITY TO USE ITS WEBSITES, OR FOR ANY INFORMATION, SOFTWARE, PRODUCTS, GOODS AND/OR SERVICES OBTAINED THROUGH THE WEBSITES, OR OTHERWISE ARISING OUT OF THE USE OF THE WEBSITES, WHETHER RESULTING IN WHOLE OR IN PART, FROM BREACH OF CONTRACT, TORTIOUS BEHAVIOR, NEGLIGENCE, STRICT LIABILITY OR OTHERWISE, REGARDLESS OF WHETHER OR NOT THE CLIENT KNOWS, SUSPECTS OR HAS BEEN ADVISED OF THE POSSIBILITY OF ANY SUCH DAMAGES. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO THE ABOVE EXCLUSION MAY NOT APPLY TO THE CLIENT, IF THE CLIENT RESIDES IN SUCH A JURISDICTION.
                    </p>
                    <p>
                        INDEMNITY<br />
                        As a condition precedent to the use of the EquiMine service and/or websites of EquiMine , the Client agrees to defend and indemnify EquiMine, Inc. and its employees, agents and/or Service Providers from and against any and all liabilities, expenses (including attorneys' fees) and damages arising out of claims resulting from Client's use of EquiMine 's service, including without limitation, any claims alleging facts, that if true, would constitute a breach by Client of these Terms of Use.
                    </p>
                    <p>
                        Choice of Law:<br />
                        These Terms of Use shall be deemed to have been agreed to in the State of California. In any litigation arising out of these Terms of Use, the prevailing party shall be entitled to reasonable attorneys' fees and costs.
                    </p>
                    <p>
                        Jurisdiction:<br />
                        All actions brought hereunder, whether at law or in equity, shall be brought in the state or federal courts located in and serving the State of California. Client consents to jurisdiction in the state of California and expressly waives any jurisdiction privileges which may be asserted in connection with these Terms of Use. or any claim that California is an inconvenient forum.
                    </p>
                    <p>
                        MISCELLANEOUS TERMS<br />
                        These Terms of Use may not be modified except by a writing signed both parties.
                        1. A party's failure to enforce strict performance of any provision of these Terms of Use will not constitute a waiver its right to subsequently enforce such provision or any other provision of these Terms of Use.
                        2. Reservation of Rights. EquiMine, Inc, Inc. reserves all rights not expressly granted to you in this license agreement.
                        3. This agreement shall be deemed as being jointly drafted and not construed in favor of or against any party.
                    </p>
                    <p>
                        CONSENT<br />
                        I have carefully read and considered all provisions of these Terms of Use and agree that all of the terms set forth are fair and reasonable. I acknowledge and warrant that I unconditionally consent to all of the terms of this the terms of this Terms of Use agreement.
                    </p>
                    <p>
                        <b>BY INSTALLING THE SOFTWARE AND/OR ACCESSING THE WEBSITE OR SERVICE, YOU (EITHER AN INDIVIDUAL OR A SINGLE ENTITY) CONSENT TO BE BOUND BY AND BECOME A PARTY TO THE AGREEMENT CONSTITUED BY THESE TERMS OF USE. IF YOU DO NOT AGREE TO ALL OF THESE TERMS OF USE, DO NOT INSTALL THE EQUIMINE SOFTWARE AND/OR ACCESS THE WEBSITE OR SERVICE.</b>
                    </p>
                </div>
                </DialogContentText>
                <FormControlLabel
                    control={<Checkbox
                            checked={termsChecked}
                            onChange={(event) => setTermsChecked(event.target.checked)}
                            name="terms"
                            value="terms"
                            color="primary"
                        />
                    }
                    label={<div>Accept Terms & Conditions</div>}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { setTermsChecked(false); toggleDialog()}} variant="contained">
                    CANCEL
                </Button>
                <Button disabled={!termsChecked} onClick={handleConfirm} variant="contained" color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
}

const mapStateToProps = (state) => {
    return {
    }
}
const mapDispatch = (dispatch) => {
    return bindActionCreators({
    }, dispatch)
}
  
export default connect(mapStateToProps, mapDispatch)(TermsContractDialog)
