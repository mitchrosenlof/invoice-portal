import {
	Dialog,
	DialogBackdrop,
	Transition,
	TransitionChild,
} from '@headlessui/react';
import React, { Fragment, JSX } from 'react';

type Props = {
	children: React.ReactNode;
	isOpen: boolean;
	closeModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const Modal = ({ children, isOpen, closeModal }: Props): JSX.Element => {
	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog
				as="div"
				className={`fixed inset-0 z-20 overflow-y-auto`}
				onClose={closeModal}
			>
				<div className="flex min-h-screen items-center justify-center px-4 text-center">
					<DialogBackdrop
						transition
						className="fixed inset-0 bg-black/20 transition-opacity"
					/>

					{/* This element is to trick the browser into centering the modal contents. */}
					<span
						className="inline-block h-screen align-middle"
						aria-hidden="true"
					>
						&#8203;
					</span>
					<TransitionChild
						as="div"
						className="relative"
						enter="ease-out duration-300"
						enterFrom="opacity-0 scale-95"
						enterTo="opacity-100 scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 scale-100"
						leaveTo="opacity-0 scale-95"
					>
						{children}
					</TransitionChild>
				</div>
			</Dialog>
		</Transition>
	);
};

export default Modal;
