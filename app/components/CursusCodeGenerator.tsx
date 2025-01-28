import {Grid, Stack, Typography} from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import {Looks3, Looks4, LooksOne, LooksTwo} from "@mui/icons-material";
import * as React from "react";
import {useLocalStorage} from "../hooks/useLocalStorage";
import {LocalStorageEnum} from "../types/LocalStorageEnum";
import {useEffect} from "react";

export default function CursusCodeGenerator() {
    const { value: initGuildValue, setItem: setLocalGuild, removeItem: unsetLocalGuild } = useLocalStorage<string>(LocalStorageEnum.Guild)
    const { value: initYearValue, setItem: setLocalYear, removeItem: unsetLocalYear } = useLocalStorage<string>(LocalStorageEnum.Year)
    const { value: initSemesterValue, setItem: setLocalSemester, removeItem: unsetLocalSemester } = useLocalStorage<string>(LocalStorageEnum.Semester)

    const [year, setYear] = React.useState<string | null>(initYearValue);
    const [semester, setSemester] = React.useState<string | null>(initSemesterValue);
    const [guild, setGuild] = React.useState<string | null>(null);

    useEffect(() => {
        setYear(initYearValue);
        setSemester(initSemesterValue);
    }, [initYearValue, initSemesterValue]);

    const handleYear = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setYear(newAlignment);
    };

    const handleSemester = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        setSemester(newAlignment);
    };

    useEffect(() => {
        setGuild(initGuildValue);
    }, [initGuildValue]);

    const handleGuild = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: string | null,
    ) => {
        newAlignment ? setLocalGuild(newAlignment) : unsetLocalGuild();
        // setGuild(newAlignment);
    };

    const yearMap = new Map([
        ["1", "TICT-OV1"],
        ["2", "TICT-OV2"],
        ["3", "TICT-OV3"],
        ["4", "TICT-OV3"],
    ])

    const guildMap = new Map([
        ["BE", "BE"],
        ["FE", "FE"],
        ["AI", "AI"],
        ["TI", "TI"],
        ["CSC", "CS"],
        ["BIT", "BI"],
        ["GD", "OI"],
        ["UI/UX", "OI"],
    ])

    const afstudeerCode = "TICT-AFSTUD-19"
    const code = React.useMemo(() => {
        if (year === "4" && semester === "2") return afstudeerCode;
        if (year === "1") {
            return yearMap.get(year) + "SE" + (semester ?? "??") + "-24"
        }
        if (year === "2") {
            return (yearMap.get(year) ?? "??") + "OP" + (guildMap.get(guild) ?? "??") + (semester ?? "?") + "-21"
        }

        if (year === "4" && semester === "1") {
            return yearMap.get(year) + "OI" + (guildMap.get(guild) ?? "??") + "3" + "-21"
        }

        if (year === "3") {
            return (yearMap.get(year) ?? "??") + "OI" + (guildMap.get(guild) ?? "??") + (semester ?? "?") + "-21"
        }

        return "TICT-" + "OV" + "?" + "??" + "??" + "?" + "-??"

    }, [year, semester, guild]);

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
                    <ToggleButtonGroup
                        value={guild}
                        exclusive
                        onChange={handleGuild}
                        aria-label="text alignment"
                    >
                        <ToggleButton value="BE">
                            <Typography>BE</Typography>
                        </ToggleButton>
                        <ToggleButton value="FE">
                            <Typography>FE</Typography>
                        </ToggleButton>
                        <ToggleButton value="AI">
                            <Typography>AI</Typography>
                        </ToggleButton>
                        <ToggleButton value="TI">
                            <Typography>TI</Typography>
                        </ToggleButton>
                        <ToggleButton value="CSC">
                            <Typography>CSC</Typography>
                        </ToggleButton>
                        <ToggleButton value="BIT">
                            <Typography>BIT</Typography>
                        </ToggleButton>
                        <ToggleButton value="GD">
                            <Typography>GD</Typography>
                        </ToggleButton>
                        <ToggleButton value="UI/UX">
                            <Typography>UI/UX</Typography>
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Stack>
            </Grid>
            <Typography variant="h1" align={"center"}>{code}</Typography>
        </>
    )
}