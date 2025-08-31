import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";
import useSettings from "./useSettings";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const { settings, isLoading } = useSettings();

  const { updateExistingSetting, isUpdating } = useUpdateSetting();

  const handleUpdating = (
    e: React.FocusEvent<HTMLInputElement, Element>,
    field: string
  ) => {
    const { value } = e.target;
    if (!value) return;

    updateExistingSetting({ [field]: Number(value) });
  };
  if (isLoading) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          name="minBookingLength"
          onBlur={(e) => handleUpdating(e, "minBookingLength")}
          defaultValue={settings.minBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          onBlur={(e) => handleUpdating(e, "maxBookingLength")}
          defaultValue={settings.maxBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          onBlur={(e) => handleUpdating(e, "maxGuestsPerBooking")}
          defaultValue={settings.maxGuestsPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          onBlur={(e) => handleUpdating(e, "breakfastPrice")}
          defaultValue={settings.breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
