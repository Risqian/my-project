import React, { useState, useEffect } from 'react';

// material ui
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';

import useStyles from './styles';


import validation from '../validation';


function SubFormRadio({ id, setValue, saveValue, value, form, keluarga, no_kk }) {

    const classes = useStyles();
    const [error, setError] = useState({});

    const [berlaku, setBerlaku] = useState(false);

    useEffect(() => {
        setError({})
    }, [])

    useEffect(() => {
        //console.log('validation called');
        if (form.dependencies.length <= 0) {
            setBerlaku(true)
        } else {
            const valuesKel = Object.values(keluarga);
            const cekberlaku = form.dependencies.some(dep => {
                return validation[dep](valuesKel)
            });

            if (!cekberlaku) {
                setValue({ target: { name: 'jawaban', value: '3' } })
            }
            setBerlaku(cekberlaku)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id, form])


    const { pertanyaan, pertanyaanA, pertanyaanB, pertanyaanC, pertanyaanD } = form;
    const handleChange = (e) => {

        if (e.target.type === "number") {
            if (parseInt(e.target.value) < 0)
                return false;

            // if (e.target.name === "kondisi" && ![0, 1].includes(parseInt(e.target.value))) {
            //     return false;
            // }
        }


        setValue(e)

        setError({
            ...error,
            [e.target.name]: ""
        })

        // setSomethingChange(true)
    }

    const validate = () => {
        let newError = {};

        if (!value.jawaban) {
            newError.jawaban = "Wajib diisi";
        }

        return newError;
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        const findErrors = validate();

        const errorValues = Object.values(findErrors);

        if (errorValues.length > 0 && errorValues.some(err => err !== '')) {
            setError(findErrors);
        } else {

            let normalizeValue = {
                Pertanyaan: pertanyaan,
                Jawab_Pilih: 0,
                Jawaban_H1: value.kondisi || 0,
                Jawaban_H2: 0,
                No_Pertanyaan: parseInt(form.no),
                Lainnya: value.jawaban_lainnya || '',
                answer: [
                    {
                        No_Jawaban: 1,
                        pilihanpk: value.jawabanA
                    },
                    {
                        No_Jawaban: 2,
                        pilihanpk: value.jawaban
                    },
                    {
                        No_Jawaban: 3,
                        pilihanpk: value.jawabanC
                    },
                    {
                        No_Jawaban: 4,
                        pilihanpk: value.jawabanD
                    }
                ]
            }
            if (value._rev) {
                normalizeValue._rev = value._rev
            }
            saveValue(normalizeValue)
        }
    }
    //console.log('here')
    return (<form id={id} onSubmit={handleSubmit} noValidate>
        <div className={classes.card}>
            <div className={classes.cardHeader}>
                <Typography margin="normal" paragraph>
                    <span className={classes.badge}>{form.no}</span>{pertanyaan}</Typography>
            </div>
            <div className={classes.cardBody}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography>{pertanyaanA}</Typography>
                        <FormControl error={error.jawaban ? true : false} component="fieldset">
                            <RadioGroup value={value.jawabanA || ''}
                                onChange={handleChange}
                                aria-label="jawabanA" name="jawabanA" row>
                                <Grid item xs={12}>
                                    <FormControlLabel control={<Radio />}
                                        value="1"
                                        label="Ya"
                                        labelPlacement="end"
                                    />
                                </Grid>
                                <Grid item xs={12} >
                                    <FormControlLabel control={<Radio />}
                                        value="2"
                                        label="Tidak"
                                        labelPlacement="end"
                                    />
                                </Grid>
                            </RadioGroup>
                            <FormHelperText>{error.jawaban}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{pertanyaanB}</Typography>
                        <FormControl error={error.jawaban ? true : false} component="fieldset">
                            <RadioGroup value={value.jawaban || ''}
                                onChange={handleChange}
                                aria-label="jawaban" name="jawaban">
                                {form.options2.map((option, index) => {
                                    let disabled = false;

                                    if (option === 'Tidak Berlaku' && berlaku) {
                                        disabled = true;
                                    } else if (option !== 'Tidak Berlaku' && !berlaku) {
                                        disabled = true;
                                    }

                                    return <FormControlLabel
                                        disabled={disabled}
                                        key={index}
                                        control={<Radio />}
                                        value={`${index + 1}`}
                                        label={option} />
                                })}
                            </RadioGroup>
                            <FormHelperText>{error.jawaban}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{pertanyaanC}</Typography>
                        <FormControl error={error.jawaban ? true : false} component="fieldset">
                            <RadioGroup value={value.jawabanC || ''}
                                onChange={handleChange}
                                aria-label="jawabanC" name="jawabanC" row>
                                <Grid item xs={12}>
                                    <FormControlLabel control={<Radio />}
                                        value="1"
                                        label="Ya"
                                        labelPlacement="end"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel control={<Radio />}
                                        value="2"
                                        label="Tidak"
                                        labelPlacement="end"
                                    />
                                </Grid>
                            </RadioGroup>
                            <FormHelperText>{error.jawaban}</FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography>{pertanyaanD}</Typography>
                        <FormControl error={error.jawaban ? true : false} component="fieldset">
                            <RadioGroup value={value.jawabanD || ''}
                                onChange={handleChange}
                                aria-label="jawabanD" name="jawabanD" row>
                                <Grid item xs={12}>
                                    <FormControlLabel control={<Radio />}
                                        value="1"
                                        label="Ya"
                                        labelPlacement="end"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormControlLabel control={<Radio />}
                                        value="2"
                                        label="Tidak"
                                        labelPlacement="end"
                                    />
                                </Grid>
                            </RadioGroup>
                            <FormHelperText>{error.jawaban}</FormHelperText>
                        </FormControl>
                    </Grid>

                </Grid>
            </div>
        </div>
    </form>
    )
}

export default SubFormRadio;