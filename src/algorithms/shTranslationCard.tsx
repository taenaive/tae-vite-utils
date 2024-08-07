import { Card, CardContent } from "@mui/material";
import PanelCardHeader from "../PanelCardHeader.tsx";
import Taggy from "./taggy.tsx";

type TranslationCardProps = {
    text: string;
    setSize: Function;
    spans?: { start: number, end: number, type: string }[];
    ents?: { type: string, color: { r: number, g: number, b: number } }[]
};
const cheatText =  `Wall Street Journal reporter Evan Gershkovich and former US Marine Paul Whelan were among two dozen detainees that were released Thursday as part of the biggest prisoner exchange between Russia and the West since the Cold War. In remarks from the White House, US President Joe Biden praised the Americans' release while standing alongside their family members. En route to the US: The released Americans, which also included Russian-American journalist Alsu Kurmasheva, are headed to the United States, according to a senior administration official. The historic prisoner swap between Russia and the West is complete, a Turkish security source told CNN. Other prisoners released: Turkey said it played a mediator role in the swap, which involved 24 detainees and seven countries. A host of Russian dissidents were also freed while in return Moscow got a convicted Russian assassin jailed in Germany. Complicated negotiations: Thursday’s massive swap was the result of complicated behind-the-scenes negotiations involving the US, Russia, Belarus and Germany. The deal ends a nightmare that lasted more than five years for Whelan and more than a year for Gershkovich. Both were designated by the US as wrongfully detained.`
const modelResult = [{'text': 'Wall Street Journal', 'label': 'ORG', 'start_char': 1, 'end_char': 20}, {'text': 'Evan Gershkovich', 'label': 'PERSON', 'start_char': 30, 'end_char': 46}, {'text': 'US', 'label': 'GPE', 'start_char': 58, 'end_char': 60}, {'text': 'Paul Whelan', 'label': 'PERSON', 'start_char': 68, 'end_char': 79}, {'text': 'two dozen', 'label': 'CARDINAL', 'start_char': 91, 'end_char': 100}, {'text': 'Thursday', 'label': 'DATE', 'start_char': 130, 'end_char': 138}, {'text': 'Russia', 'label': 'GPE', 'start_char': 188, 'end_char': 194}, {'text': 'West', 'label': 'LOC', 'start_char': 203, 'end_char': 207}, {'text': 'the Cold War', 'label': 'EVENT', 'start_char': 214, 'end_char': 226}, {'text': 'the White House', 'label': 'ORG', 'start_char': 244, 'end_char': 259}, {'text': 'US', 'label': 'GPE', 'start_char': 261, 'end_char': 263}, {'text': 'Joe Biden', 'label': 'PERSON', 'start_char': 274, 'end_char': 283}, {'text': 'Americans', 'label': 'NORP', 'start_char': 296, 'end_char': 305}, {'text': 'US', 'label': 'GPE', 'start_char': 378, 'end_char': 380}, {'text': 'Americans', 'label': 'NORP', 'start_char': 395, 'end_char': 404}, {'text': 'Russian-American', 'label': 'NORP', 'start_char': 426, 'end_char': 442}, {'text': 'Alsu Kurmasheva', 'label': 'PERSON', 'start_char': 454, 'end_char': 469}, {'text': 'the United States', 'label': 'GPE', 'start_char': 485, 'end_char': 502}, {'text': 'Russia', 'label': 'GPE', 'start_char': 586, 'end_char': 592}, {'text': 'West', 'label': 'LOC', 'start_char': 601, 'end_char': 605}, {'text': 'Turkish', 'label': 'NORP', 'start_char': 621, 'end_char': 628}, {'text': 'CNN', 'label': 'ORG', 'start_char': 650, 'end_char': 653}, {'text': 'Turkey', 'label': 'GPE', 'start_char': 681, 'end_char': 687}, {'text': '24', 'label': 'CARDINAL', 'start_char': 747, 'end_char': 749}, {'text': 'seven', 'label': 'CARDINAL', 'start_char': 764, 'end_char': 769}, {'text': 'Russian', 'label': 'NORP', 'start_char': 791, 'end_char': 798}, {'text': 'Moscow', 'label': 'GPE', 'start_char': 842, 'end_char': 848}, {'text': 'Russian', 'label': 'NORP', 'start_char': 865, 'end_char': 872}, {'text': 'Germany', 'label': 'GPE', 'start_char': 892, 'end_char': 899}, {'text': 'Thursday', 'label': 'DATE', 'start_char': 927, 'end_char': 935}, {'text': 'US', 'label': 'GPE', 'start_char': 1026, 'end_char': 1028}, {'text': 'Russia', 'label': 'GPE', 'start_char': 1030, 'end_char': 1036}, {'text': 'Belarus', 'label': 'GPE', 'start_char': 1038, 'end_char': 1045}, {'text': 'Germany', 'label': 'GPE', 'start_char': 1050, 'end_char': 1057}, {'text': 'more than five years', 'label': 'DATE', 'start_char': 1097, 'end_char': 1117}, {'text': 'Whelan', 'label': 'PERSON', 'start_char': 1122, 'end_char': 1128}, {'text': 'more than a year', 'label': 'DATE', 'start_char': 1133, 'end_char': 1149}, {'text': 'Gershkovich', 'label': 'PERSON', 'start_char': 1154, 'end_char': 1165}, {'text': 'US', 'label': 'GPE', 'start_char': 1195, 'end_char': 1197}]

const ShTranslationCard = (props: TranslationCardProps) => {
    return (
        <Card elevation={3} sx={{ m: 1, p: 1 }}>
            <PanelCardHeader title="Translation" setSize={props.setSize} orderNumber={"2"} />
            <CardContent>
                {(props.spans?.length || props.ents?.length) ?
                    <Taggy
                        text= {props.text}
                        spans={props.spans as  { start: number, end: number, type: string }[]}
                        ents={props.ents as { type: string, color: { r: number, g: number, b: number } }[]}
                    /> : props.text
                }
            </CardContent>
        </Card>
    );
}

export default ShTranslationCard;
