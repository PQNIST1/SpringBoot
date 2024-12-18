import { Modal, Button, Label, TextInput, Textarea, Select } from 'flowbite-react';
import { useState } from 'react';

const Modals = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <Button onClick={toggleModal} gradientDuoTone="blueToIndigo">
                Toggle modal
            </Button>

            <Modal show={isOpen} onClose={toggleModal}>
                <Modal.Header>
                    Create New Product
                </Modal.Header>
                <Modal.Body>
                    <form className="space-y-4">
                        <div>
                            <Label htmlFor="name" value="Name" />
                            <TextInput
                                id="name"
                                name="name"
                                placeholder="Type product name"
                                required
                            />
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <Label htmlFor="price" value="Price" />
                                <TextInput
                                    id="price"
                                    name="price"
                                    type="number"
                                    placeholder="$2999"
                                    required
                                />
                            </div>
                            <div>
                                <Label htmlFor="category" value="Category" />
                                <Select id="category">
                                    <option value="" disabled>
                                        Select category
                                    </option>
                                    <option value="TV">TV/Monitors</option>
                                    <option value="PC">PC</option>
                                    <option value="GA">Gaming/Console</option>
                                    <option value="PH">Phones</option>
                                </Select>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="description" value="Product Description" />
                            <Textarea
                                id="description"
                                placeholder="Write product description here"
                                rows={4}
                            />
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => alert('Product added')} gradientDuoTone="greenToBlue">
                        Add new product
                    </Button>
                    <Button color="gray" onClick={toggleModal}>
                        Cancel
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

export default Modals;
