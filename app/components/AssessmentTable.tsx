import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import {Looks3, Looks4, LooksOne, LooksTwo} from "@mui/icons-material";
import {Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {LocalStorageEnum} from "../types/LocalStorageEnum";
import {useEffect} from "react";

export default function AssessmentTable() {
    const { value: initYearValue, setItem: setLocalYear, removeItem: unsetLocalYear } = useLocalStorage<string>(LocalStorageEnum.Year)
    const { value: initSemesterValue, setItem: setLocalSemester, removeItem: unsetLocalSemester } = useLocalStorage<string>(LocalStorageEnum.Semester)


    const [year, setYear] = React.useState<string | null>(initYearValue);
    const [semester, setSemester] = React.useState<string | null>(initSemesterValue);

    useEffect(() => {
        setYear(initYearValue);
    }, [initYearValue]);

    const handleYear = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        newAlignment ? setLocalYear(newAlignment) : unsetLocalYear();
        // setYear(newAlignment);
    };

    useEffect(() => {
        setSemester(initSemesterValue);
    }, [initSemesterValue]);

    const handleSemester = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        newAlignment ? setLocalSemester(newAlignment) : unsetLocalSemester();
        // setSemester(newAlignment);
    };

    const semesters = [
        { aka: (<span>Open Propedeuse<br/>Prod & Dev. 1</span>), desc: "4 van de 10 op 1**", KPM: null, HBOI: null },
        { aka: (<span>Open Propedeuse<br/>Prod & Dev. 2</span>), desc: "2 op start 7 op 1", KPM: "1 op niv. 1", HBOI: "4 op 1"},
        { aka: (<span>Open Projecten 1<br/>met beroepsrol</span>), desc: "6 op 1 en 3 op 2", KPM: "1 op niv. 1", HBOI: "6 op 1"},
        { aka: (<span>Open Projecten 2<br/>met beroepsrol</span>), desc: "2 op 1 en 7 op 2", KPM: "1 op niv. 2", HBOI: "4 op 2 en 2 op 1"},
        { aka: (<span>Open Innovation 1<br/>met beroepsrol (project of stage)</span>), desc: "8 op 2 en 1 op 3", KPM: "1 op niv. 2", HBOI: "1 op 3 en 4 op 2" },
        { aka: (<span>Open Innovation 2<br/>met beroepsrol (project of stage)</span>), desc: "6 op 2 en 3 op 3", KPM: "1 op niv. 3", HBOI: "2 op 3 en 4 op 2" },
        { aka: (<span>Open Innovation 3<br/>met beroepsrol (project of stage)</span>), desc: "4 op 2 en 5 op 3", KPM: "1 op niv. 3", HBOI: "2 op 3 en 4 op 2" },
        { aka: "Afstuderen", desc: (<span>OC en KPM samen voldoende<br />KC en JKO samen voldoende<br/>PL, S, BD, FO, PH en RE samen voldoende****</span>), KPM: null, HBOI: "1 op 3 en 1 op 2" },
    ]

    const filteredSemesters = React.useMemo(() => {
        if (year && !semester) {
            let yearInt = (parseInt(year, 10) - 1) * 2;
            return semesters.slice(yearInt, yearInt + 3);
        }
        if (!year || !semester) return semesters;

        let yearInt = parseInt(year, 10) - 1;
        const startIndex = yearInt * 2 + (parseInt(semester, 10) - 1);
        if (yearInt === 3) return semesters.slice(startIndex, startIndex + 1);
        return semesters.slice(startIndex, startIndex + 2);
    }, [year, semester]);

    let table;
    if (!year || !semester) {
        table = (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell rowSpan={2}>
                                Semester
                            </TableCell>
                            <TableCell rowSpan={2}>
                                Cursus
                            </TableCell>
                            <TableCell align={"center"} colSpan={3}>
                                Vaardigheden*
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Vaardigheden
                            </TableCell>
                            <TableCell>
                                KPM
                            </TableCell>
                            <TableCell>
                                HBO-I***
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredSemesters.map((semester, index) => {
                            index += 1
                            return (
                                <TableRow key={index}>
                                    <TableCell>
                                        {index}
                                    </TableCell>
                                    <TableCell>
                                        {semester.aka}
                                    </TableCell>
                                    <TableCell>
                                        {semester.desc}
                                    </TableCell>
                                    <TableCell>
                                        {semester.KPM}
                                    </TableCell>
                                    <TableCell>
                                        {semester.HBOI}
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        )
    } else if (filteredSemesters.length === 2) {
        table = (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell rowSpan={2}>
                                Semester
                            </TableCell>
                            <TableCell rowSpan={2}>
                                Cursus
                            </TableCell>
                            <TableCell align={"center"} colSpan={3}>
                                Vaardigheden*
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Vaardigheden
                            </TableCell>
                            <TableCell>
                                KPM
                            </TableCell>
                            <TableCell>
                                HBO-I***
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                Op niveau
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[0].aka}
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[0].desc}
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[0].KPM}
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[0].HBOI}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Boven niveau
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[1].aka}
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[1].desc}
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[1].KPM}
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[1].HBOI}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
    } else if (year === "4" && semester === "1") {
        table = (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell rowSpan={2}>
                                Semester
                            </TableCell>
                            <TableCell rowSpan={2}>
                                Cursus
                            </TableCell>
                            <TableCell align={"center"} colSpan={3}>
                                Vaardigheden*
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Vaardigheden
                            </TableCell>
                            <TableCell>
                                KPM
                            </TableCell>
                            <TableCell>
                                HBO-I***
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                Op niveau
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[0].aka}
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[0].desc}
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[0].KPM}
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[0].HBOI}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell colSpan={5}>
                                Bekijk de studiewijzer
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
    } else if (year === "4" && semester === "2") {
        table = (
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell rowSpan={2}>
                                Semester
                            </TableCell>
                            <TableCell rowSpan={2}>
                                Cursus
                            </TableCell>
                            <TableCell align={"center"} colSpan={3}>
                                Vaardigheden*
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Vaardigheden
                            </TableCell>
                            <TableCell>
                                KPM
                            </TableCell>
                            <TableCell>
                                HBO-I***
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>
                                Om te slagen
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[0].aka}
                            </TableCell>
                            <TableCell colSpan={2}>
                                {filteredSemesters[0].desc}
                            </TableCell>
                            <TableCell>
                                {filteredSemesters[0].HBOI}
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Met Genoegen
                            </TableCell>
                            <TableCell colSpan={4}>
                                Bekijk de OER
                            </TableCell>

                        </TableRow>
                        <TableRow>
                            <TableCell>
                                Cum Laude
                            </TableCell>
                            <TableCell colSpan={4}>
                                Bekijk de OER
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }


    return (
        <>
            <Grid container spacing={1}>
                <Stack direction="row" spacing={4}>
                    <ToggleButtonGroup
                        value={year}
                        exclusive
                        onChange={handleYear}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="1" aria-label="jaar 1">
                            <LooksOne />
                        </ToggleButton>
                        <ToggleButton value="2" aria-label="jaar 2">
                            <LooksTwo />
                        </ToggleButton>
                        <ToggleButton value="3" aria-label="jaar 3">
                            <Looks3 />
                        </ToggleButton>
                        <ToggleButton value="4" aria-label="jaar 4">
                            <Looks4 />
                        </ToggleButton>
                    </ToggleButtonGroup>
                    <ToggleButtonGroup
                        value={semester}
                        exclusive
                        onChange={handleSemester}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="1">
                            <Typography>Semester 1</Typography>
                        </ToggleButton>
                        <ToggleButton value="2">
                            <Typography>Semester 2</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
                {table}
            </Grid>
        </>
    );

}
