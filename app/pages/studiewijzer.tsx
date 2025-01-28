import * as React from 'react';
import {
    Card,
    CardContent, CardHeader,
    Grid
} from "@mui/material";
import AssessmentTable from "../components/AssessmentTable";
import CursusCodeGenerator from "../components/CursusCodeGenerator";

export default function Studiewijzer() {
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Card sx={{ minWidth: 300 }}>
                        <CardHeader title={"5.2.3. Eisen aan vaardigheden per semester"} subheader={"In Tabel 3 is te zien aan welke niveaus de vaardigheden en de HBO-i beroepstaken per semester moeten voldoen voor een op niveau beoordeling."} component={"h1"} />
                        <CardContent>
                            <AssessmentTable />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card sx={{ minWidth: 300 }}>
                        <CardHeader title={"Bijlage 1; Open-ICT Cursussen 2023-2024"} component={"h1"} />
                        <CardContent>
                            <CursusCodeGenerator />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    );

}
