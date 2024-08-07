import { Card, CardContent } from "@mui/material";
import PanelCardHeader from "../PanelCardHeader.tsx";
import Taggy from "./taggy.tsx";

type TranslationCardProps = {
    text: string;
    setSize: Function;
    spans?: { start: number, end: number, type: string }[];
    ents?: { type: string, color: { r: number, g: number, b: number } }[]
};

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
