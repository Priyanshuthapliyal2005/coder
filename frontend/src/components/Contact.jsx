import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import indiaFlag from "@/assets/india.png";
import { FaFlagUsa } from "react-icons/fa";

export default function Component() {
  const [form, setForm] = useState({
    name: "",
    prefix: "",
    phone: "",
    message: "I would like to receive more information",
    agreement: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, prefix, phone, message } = form;
    
    const formData = new FormData();
    formData.append("access_key", "36f7d5b8-02bf-4808-9da7-9a683bd26ca5");
    formData.append("name", name);
    formData.append("prefix", prefix);
    formData.append("phone", phone);
    formData.append("message", message);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Message sent successfully!");
        setForm({
          name: "",
          prefix: "",
          phone: "",
          message: "I would like to receive more information",
          agreement: false,
        });
      } else {
        alert("Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Failed to send message. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div key="1" className="border-2 border-gray-300 dark:border-gray-700 p-4 rounded-md shadow-md space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold">Contact Us</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Please fill the below form and we will get back to you as soon as possible.
          </p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="name">
              Name
            </Label>
            <Input
              className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
              id="name"
              placeholder="Enter your name"
              value={form.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex space-x-2 space-y-2 items-end">
            <div className="w-1/12 space-y-2">
              <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="prefix">
                Prefix
              </Label>
              <Select
                className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full"
                id="prefix"
                required
                value={form.prefix}
                onValueChange={(value) => setForm((prevForm) => ({ ...prevForm, prefix: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a prefix" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="+1">
                      <FaFlagUsa className="inline-block mr-2" />
                      (+1)
                    </SelectItem>
                    <SelectItem value="+91">
                      <img
                        alt="Indian Flag"
                        className="inline-block mr-2"
                        height={20}
                        src={indiaFlag}
                        style={{ aspectRatio: "20/20", objectFit: "cover" }}
                        width={20}
                      />
                      (+91)
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="w-3/4 space-y-2">
              <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="phone">
                Phone Number
              </Label>
              <Input
                className="border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800"
                id="phone"
                placeholder="Enter your phone number"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label className="text-gray-600 dark:text-gray-400 required" htmlFor="message">
              Message
            </Label>
            <textarea
              className="border-2 border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full p-2"
              id="message"
              placeholder="Type your message"
              value={form.message}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox className="text-gray-600 dark:text-gray-400" id="agreement" required />
            <Label className="text-sm font-normal text-gray-600 dark:text-gray-400" htmlFor="agreement">
              I agree to the
              <button className="underline underline-offset-2 text-gray-600 dark:text-gray-400">
                Terms & Conditions
              </button>
            </Label>
          </div>
          <Button className="w-full bg-gray-300 dark:bg-gray-700 text-black dark:text-white" type="submit">
            Submit
          </Button>
        </div>
      </div>
    </form>
  );
}
