import React from "react";
import {
  AktivitetskravStatus,
  AvventVurderingArsak,
  CreateAktivitetskravVurderingDTO,
} from "@/data/aktivitetskrav/aktivitetskravTypes";
import { AvventFristDato } from "@/components/aktivitetskrav/vurdering/AvventFristDato";
import { SkjemaHeading } from "@/components/aktivitetskrav/vurdering/SkjemaHeading";
import { SkjemaInnsendingFeil } from "@/components/SkjemaInnsendingFeil";
import { useVurderAktivitetskrav } from "@/data/aktivitetskrav/useVurderAktivitetskrav";
import {
  AktivitetskravSkjemaValues,
  VurderAktivitetskravSkjemaProps,
} from "@/components/aktivitetskrav/vurdering/vurderAktivitetskravSkjemaTypes";
import { SkjemaFieldContainer } from "@/components/aktivitetskrav/vurdering/SkjemaFieldContainer";
import { FormProvider, useForm } from "react-hook-form";
import { Button, Checkbox, CheckboxGroup } from "@navikt/ds-react";
import { avventVurderingArsakTexts } from "@/data/aktivitetskrav/aktivitetskravTexts";
import BegrunnelseTextarea, {
  begrunnelseMaxLength,
} from "@/components/aktivitetskrav/vurdering/BegrunnelseTextarea";
import { ButtonRow } from "@/components/Layout";

const texts = {
  title: "Avvent",
  subtitle1:
    "Informasjonen du oppgir her vil kun brukes til videre saksbehandling.",
  subtitle2: "Ingenting sendes videre til arbeidstaker eller arbeidsgiver.",
  begrunnelseLabel: "Begrunnelse",
  arsakLegend: "Årsak (obligatorisk)",
  missingArsak: "Vennligst angi årsak",
  lagre: "Lagre",
  avbryt: "Avbryt",
};

export interface AvventAktivitetskravSkjemaValues
  extends AktivitetskravSkjemaValues {
  arsaker: AvventVurderingArsak[];
  fristDato?: string;
}

interface AvventAktivitetskravSkjemaProps
  extends VurderAktivitetskravSkjemaProps {
  setModalOpen: (isOpen: boolean) => void;
}

export const AvventAktivitetskravSkjema = ({
  aktivitetskravUuid,
  setModalOpen,
}: AvventAktivitetskravSkjemaProps) => {
  const vurderAktivitetskrav = useVurderAktivitetskrav(aktivitetskravUuid);
  const methods = useForm<AvventAktivitetskravSkjemaValues>();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = methods;

  const submit = (values: AvventAktivitetskravSkjemaValues) => {
    const createAktivitetskravVurderingDTO: CreateAktivitetskravVurderingDTO = {
      status: AktivitetskravStatus.AVVENT,
      arsaker: values.arsaker,
      beskrivelse: values.begrunnelse,
      frist: values.fristDato,
    };
    vurderAktivitetskrav.mutate(createAktivitetskravVurderingDTO, {
      onSuccess: () => setModalOpen(false),
    });
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submit)}>
        <SkjemaHeading
          title={texts.title}
          subtitles={[texts.subtitle1, texts.subtitle2]}
        />
        <SkjemaFieldContainer>
          <CheckboxGroup
            size="small"
            legend={texts.arsakLegend}
            error={errors.arsaker && texts.missingArsak}
          >
            {Object.entries(avventVurderingArsakTexts).map(
              ([arsak, text], index) => (
                <Checkbox
                  key={index}
                  value={arsak}
                  {...register("arsaker", { required: true })}
                >
                  {text}
                </Checkbox>
              )
            )}
          </CheckboxGroup>
          <BegrunnelseTextarea
            {...register("begrunnelse", {
              maxLength: begrunnelseMaxLength,
            })}
            value={watch("begrunnelse")}
            label={texts.begrunnelseLabel}
          />
          <AvventFristDato />
        </SkjemaFieldContainer>
        {vurderAktivitetskrav.isError && (
          <SkjemaInnsendingFeil error={vurderAktivitetskrav.error} />
        )}
        <ButtonRow>
          <Button loading={vurderAktivitetskrav.isLoading} type="submit">
            {texts.lagre}
          </Button>
          <Button variant="tertiary" onClick={() => setModalOpen(false)}>
            {texts.avbryt}
          </Button>
        </ButtonRow>
      </form>
    </FormProvider>
  );
};
