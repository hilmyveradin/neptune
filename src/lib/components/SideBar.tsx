/* eslint-disable react/prop-types */
import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Button,
  VStack,
  Flex,
  Text,
  Box,
  Avatar,
  Heading,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useBreakpointValue,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  useDisclosure,
  Divider,
  Spacer,
  Image,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { BsFillHouseFill, BsFillGiftFill, BsBasket3Fill } from 'react-icons/bs';
import { MdGroups } from 'react-icons/md';

import type { AuthContextType } from '~/customHooks/interfaces';
import { useAuth } from '~/customHooks/useAuth';

type SidebarItemProps = {
  href: string;
  Icon: React.ElementType;
  label: string;
  isActive: boolean;
};

type SideBarProps = {
  currentSegment: string;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
  href,
  // eslint-disable-next-line @typescript-eslint/no-shadow
  Icon,
  label,
  isActive,
}) => (
  <Box w="100%">
    <NextLink href={href} passHref>
      <Button
        variant="ghost"
        w="100%"
        rounded="md"
        backgroundColor={isActive ? 'primary.200' : 'transparent'}
      >
        <Icon />
        <Flex align="flex-start" w="100%" ml="10px">
          {label}
        </Flex>
      </Button>
    </NextLink>
  </Box>
);

const SideBar = ({ currentSegment }: SideBarProps) => {
  const { user, signOut } = useAuth() as AuthContextType;
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div>
      {isMobile ? (
        <Flex
          as="nav"
          position="fixed"
          top={0}
          left={0}
          width="100%"
          bg="white"
          zIndex={1000}
          p={3}
          justifyContent="end"
          boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
        >
          <IconButton
            aria-label="Open menu"
            icon={<HamburgerIcon />}
            onClick={onOpen}
          />
        </Flex>
      ) : (
        <Flex
          as="nav"
          width="250px"
          height="100vh"
          position="fixed"
          bg="white"
          boxShadow="2xl"
          justifyContent="center"
          px={2}
        >
          <VStack spacing={4} width="100%" alignItems="flex-start" pt={4}>
            <Box w="100%">
              <Flex
                align="center"
                w="100%"
                fontWeight="semibold"
                justifyContent="center"
              >
                <Image src="/Logo_GarudaHacks.png" maxW="22px" mr="1" alt="" />
                BagiBuku.id
              </Flex>
            </Box>
            <Divider />
            <SidebarItem
              href="/app/dashboard"
              Icon={BsFillHouseFill}
              label="Dashboard"
              isActive={currentSegment === 'dashboard'}
            />
            <SidebarItem
              href="/app/donasi-buku"
              Icon={BsFillGiftFill}
              label="Donasi Buku"
              isActive={currentSegment === 'donasi-buku'}
            />
            <SidebarItem
              href="/app/permintaan-buku"
              Icon={BsBasket3Fill}
              label="Permintaan Buku"
              isActive={currentSegment === 'permintaan-buku'}
            />
            <SidebarItem
              href="/app/forum-buku"
              Icon={MdGroups}
              label="Forum Buku"
              isActive={currentSegment === 'forum-buku'}
            />
            <Divider />
            <Spacer />

            <Menu>
              <MenuButton w="100%">
                <Box w="100%" shadow="xs" p="1" rounded="md">
                  <Flex>
                    <Avatar name={user?.email || 'User'} size="sm" mr="2" />
                    <Box textAlign="start">
                      <Heading size="xs">{user?.displayName}</Heading>
                      <Text fontSize="xs">{user?.email}</Text>
                    </Box>
                  </Flex>
                </Box>
              </MenuButton>
              <MenuList>
                <MenuItem
                  w="100%"
                  justifyContent="center"
                  onClick={handleSignOut}
                  color="red.500"
                  borderColor="red.500"
                >
                  Keluar
                </MenuItem>
              </MenuList>
            </Menu>

            <Box w="100%" textAlign="center" pb="5px" />
          </VStack>
        </Flex>
      )}
      {isMobile && (
        <Drawer isOpen={isOpen} onClose={onClose} placement="right">
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader borderBottomWidth="1px">Menu</DrawerHeader>
              <DrawerBody>
                <VStack
                  spacing={4}
                  width="100%"
                  height="100%"
                  alignItems="flex-start"
                  pt={4}
                >
                  <SidebarItem
                    href="/app/dashboard"
                    Icon={BsFillHouseFill}
                    label="Dashboard"
                    isActive={currentSegment === 'dashboard'}
                  />
                  <SidebarItem
                    href="/app/donasi-buku"
                    Icon={BsFillGiftFill}
                    label="Daftar Donasi Buku"
                    isActive={currentSegment === 'donasi-buku'}
                  />
                  <SidebarItem
                    href="/app/permintaan-buku"
                    Icon={BsBasket3Fill}
                    label="Daftar Permintaan Buku"
                    isActive={currentSegment === 'permintaan-buku'}
                  />
                  <SidebarItem
                    href="/app/forum-buku"
                    Icon={MdGroups}
                    label="Forum Buku"
                    isActive={currentSegment === 'forum-buku'}
                  />
                  <Divider />
                  <Spacer />
                  <Menu>
                    <MenuButton w="100%">
                      <Box w="100%" shadow="xs" p="1" rounded="md">
                        <Flex>
                          <Avatar
                            name={user?.email || 'User'}
                            size="sm"
                            mr="2"
                          />
                          <Box textAlign="start">
                            <Heading size="xs">{user?.displayName}</Heading>
                            <Text fontSize="xs">{user?.email}</Text>
                          </Box>
                        </Flex>
                      </Box>
                    </MenuButton>
                    <MenuList>
                      <MenuItem
                        w="100%"
                        justifyContent="center"
                        onClick={handleSignOut}
                        color="red.500"
                        borderColor="red.500"
                      >
                        Keluar
                      </MenuItem>
                    </MenuList>
                  </Menu>
                  <Box w="100%" textAlign="center" pb="5px" />
                </VStack>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      )}
    </div>
  );
};

export default SideBar;
