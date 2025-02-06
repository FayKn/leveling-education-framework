import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { BeroepstaakOrVaardigheid } from "../types/BeroepstakenOrVaardigheden";
import { Level } from "./Level";

export function LevelsCardBeroepsproduct(props: {
  title: string;
  item: BeroepstaakOrVaardigheid;
}) {
  return (
    <Grid item xs={12}>
      <Card component={"section"}>
        {/* TODO translate titles */}
        <CardHeader title={props.title} component={"h1"}/>
        <CardContent>
          <Grid container spacing={5}>
            {Object.keys(props.item).map((niveauKey) => (
              <Level
                key={niveauKey}
                niveauKey={niveauKey}
                title={props.item[niveauKey]}
              />
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Grid>
  );
}
